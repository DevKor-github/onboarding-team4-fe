import { useAtomValue } from 'jotai';
import { socketAtom } from '../socket';
import { Chat, ChatGroup } from '../api/models/chatModel';
import { useEffect, useRef, useState } from 'react';
import MessageGroup from '../components/messageGroup';
import { MessageGroupType } from '../components/messageBubbleType';
import { useLocation } from 'react-router-dom';
import MessageField from '../components/MessageField';
import AppBar from '../components/AppBar';
import UserWithImg from '../components/UserWithImg';
import { ChatRoom } from '../api/models/ChatRoom';


function ChatPage() {

  const chatRoom : ChatRoom = useLocation().state;
  const ref = useRef<HTMLDivElement>(null);
  const socket = useAtomValue(socketAtom);
  const [, setIsConnected] = useState(socket.connected);
  const [chats, setChats] = useState([] as ChatGroup[]);

  function addChat(chat: Chat) {
    setChats((prev) => {
        if (prev.length !== 0 && prev[prev.length - 1].senderId === chat.userId) {
          const lastGroup = prev[prev.length - 1];
          lastGroup.chats.push({
            content: chat.content,
            contentType: chat.contentType,
            time: chat.time,
          });
        } else {
        prev.push({
          senderId: chat.userId,
          senderName: chat.senderName,
          img: '/src/assets/__avatar_url.png',
          chats: [
            {
              content: chat.content,
              contentType: chat.contentType,
              time: chat.time,
            },
          ],
        });
      }
      console.log(prev);
      return [...prev];
    });
  }

  function ChatListToChatGroupList(chats: Chat[]): ChatGroup[] {
    const chatGroupList: ChatGroup[] = [];
    let lastSenderId = '';
    let lastGroup: ChatGroup = {
      senderId: '',
      senderName: '',
      img: '',
      chats: [],
    };
    chats.forEach((chat) => {
      if (lastSenderId === chat.userId) {
        lastGroup.chats.push({
          content: chat.content,
          contentType: chat.contentType,
          time: chat.time,
        });
      } else {
        lastGroup = {
          senderId: chat.userId,
          senderName: chat.senderName,
          img: '/src/assets/__avatar_url.png',
          chats: [
            {
              content: chat.content,
              contentType: chat.contentType,
              time: chat.time,
            },
          ],
        };
        chatGroupList.push(lastGroup);
      }
      lastSenderId = chat.userId;
    });
    return chatGroupList;
  }

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [chats]);

  useEffect(() => {
    function onConnect() {
      console.log("socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReceiveMessage(chat: Chat) {
      console.log(chat);
      addChat(chat);
    }


    function onUserList(userList: string[]) {
      console.log(userList);
    }

    function onLoadChats(chats: Chat[]) {
      console.log(chats);
      setChats(ChatListToChatGroupList(chats));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveMessage', onReceiveMessage);
    socket.on('userList', onUserList);
    socket.on('previousMessages', onLoadChats);

    socket.emit('joinChat', {roomId: chatRoom._id});

    console.log(socket);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [chatRoom._id, socket]);

  function onSend(message: string) {
    socket.emit('sendMessage',  { content: message, roomId: chatRoom._id, senderId:"adfasdlkfajs;" });
  }

  function onValidation(message: string): boolean {
    return message !== '';
  }

  console.log(chatRoom);
  return (
    <div className='flex flex-col h-screen'>
      <AppBar />
      <div className='flex flex-row justify-between px-6 py-[0.94rem] shadow-bottom-xs'>
        <UserWithImg user={chatRoom.memberList[0]} />
        <button><img className='size-4' src="/src/assets/kebab-horizontal.svg" alt="" /></button>
      </div>
      <div ref={ref} className='flex-1 overflow-y-scroll p-3 pr-2 z-0'>
        {chats.map((chatGroup: ChatGroup, index: number) => (
          <MessageGroup key={index} type={chatRoom.memberList[0]._id !== chatGroup.senderId ? MessageGroupType.RIGHT : MessageGroupType.LEFT} data={chatGroup}/>
        ))}
      </div>
      <MessageField onSend={onSend} onVaidation={onValidation}/>
    </div>
  );
}

export default ChatPage;