import { useAtomValue } from 'jotai';
import { socketAtom } from '../socket';
import { Chat, ChatGroup } from '../api/models/chatModel';
import { useEffect, useRef, useState } from 'react';
import MessageGroup from '../components/messageGroup';
import { MessageGroupType } from '../components/messageBubbleType';


function ChatPage() {
  const ref = useRef<HTMLDivElement>(null);
  const socket = useAtomValue(socketAtom);
  const [, setIsConnected] = useState(socket.connected);
  const [chats, setChats] = useState([] as ChatGroup[]);

  function addChat(chat: Chat) {
    setChats((prev) => {
        if (prev.length !== 0 && prev[prev.length - 1].senderId === chat.senderId) {
          const lastGroup = prev[prev.length - 1];
          lastGroup.chats.push({
            content: chat.content,
            contentType: chat.contentType,
            time: chat.time,
          });
        } else {
        prev.push({
          senderId: chat.senderId,
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

    function onUserList(room: string, userList: string[]) {
      console.log(userList);
    }

    function onLoadChats(chats: Chat[]) {
      //addChats(chats);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('userList', onUserList);
    socket.on('loadChats', onLoadChats);

    socket.emit('join', 'all');

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
    };
  }, [socket]);

  return (
    <div className='h-full bg-slate-500'>
      <div className='flex flex-col w-96 mx-auto bg-white h-full p-0.5'>
        <h1>Chat</h1>
        <div ref={ref} className='overflow-y-scroll h-full p-3 pr-2'>
          {chats.map((chatGroup: ChatGroup) => (
            <MessageGroup type={socket.id === chatGroup.senderId ? MessageGroupType.RIGHT : MessageGroupType.LEFT} data={chatGroup}/>
          ))}
        </div>
        <button onClick={() => socket.emit('send_message', { content: 'Hello, world!', contentType:'text', senderId:"adfasdlkfajs;" })}>send chat</button>
      </div>
    </div>
  );
}

export default ChatPage;