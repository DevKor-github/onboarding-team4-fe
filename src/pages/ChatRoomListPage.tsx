import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import RoomTile from '../components/RoomTile';
import { useAtomValue } from 'jotai';
import { chatRoomsAtom } from '../atom/ChatRoomAtom';
import Modal from '../components/Modal';

function ChatRoomListPage () {
  const chatRooms = useAtomValue(chatRoomsAtom);
  const [showModal, setShowModal] = useState(false);

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
      //setChatRooms(tmpChatRooms);
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
      {ChatRoomList()}
    </div>
  );

  function ChatRoomList() {
    if(chatRooms.status != 'success') {
      const loadingChatRoomTiles = [];
      for(let i = 0; i < 5; i++) {
        loadingChatRoomTiles.push(<RoomTile user={null} />);
      }
      return <>
        {loadingChatRoomTiles}
        {chatRooms.status === 'error' && showModal ? <Modal 
        title={<h1 className=''>Error</h1>} 
        body={<p>에러가 발생하였습니다. 잠시후에 다시 시도해 주세요</p>} 
        footer={<button onClick={() => setShowModal(false)} className='w-full bg-primary rounded-md py-2 text-white'>close</button>}
        />: null}
      </>;

    }

    

    return <ul className='flex-1 overflow-y-scroll'>
      {chatRooms.data?.map((chatRoom) => (
        <li key={chatRoom._id}>
          <Link to={`/chat/${chatRoom._id}`} state={chatRoom}>
            <RoomTile user={chatRoom.memberList[0]} />
          </Link>
        </li>
      ))}
    </ul>;
  }
}

export default ChatRoomListPage;