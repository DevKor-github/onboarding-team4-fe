import { useAtomValue, useSetAtom } from 'jotai';
import { socketAtom } from '../socket';
import { Chat } from '../api/models/chatModel';
import { useEffect, useState } from 'react';
import { addChatsAtom, chatAtom } from '../atom/ChatAtom';

function ChatPage() {
  const socket = useAtomValue(socketAtom);
  const [, setIsConnected] = useState(socket.connected);
  const addChats = useSetAtom(addChatsAtom);
  const chats = useAtomValue(chatAtom);

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
      addChats([chat]);
    }

    function onUserList(room: string, userList: string[]) {
      console.log(userList);
    }

    function onLoadChats(chats: Chat[]) {
      addChats(chats);
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
  }, [addChats, socket]);

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={() => socket.emit('send_message', { content: 'Hello, world!', contentType:'text', senderId:"adfasdlkfajs;" })}>send chat</button>
      <div>
        {chats.map((chat: Chat, index: number) => (
          <div key={index}>
            <h2>{chat.userNick}</h2>
            <p>{chat.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;