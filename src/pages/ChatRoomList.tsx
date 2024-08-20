import { useEffect, useState } from 'react';
import { ChatRoom } from '../api/models/ChatRoom';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import RoomTile from '../components/RoomTile';

function ChatRoomList () {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const tmpChatRooms = [];
      for(let i = 0; i < 25; i++) {
        tmpChatRooms.push({
          _id: i.toString(),
          memberList: [
            {
              _id: i.toString(),
              userNick: `user${i}`,
              profileImage: '/src/assets/react.svg',
            },
          ],
        });
      }
      setChatRooms(tmpChatRooms);
    };

    fetchChatRooms();
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <AppBar />
      <div className='px-6 py-[0.94rem]'>
        <h1>채팅</h1>
      </div>
      <div className='h-2.5 w-full bg-[#FAFAFA]'></div>
      <ul className='flex-1 overflow-y-scroll'>
        {chatRooms.map((chatRoom) => (
          <li key={chatRoom._id}>
            <Link to={`/chat/${chatRoom._id}`}>
              <RoomTile chatRoom={chatRoom} user={chatRoom.memberList[0]} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;  