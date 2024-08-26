import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import RoomTile from '../components/RoomTile';
import { useAtomValue } from 'jotai';
import { addChatRoomAtom, chatRoomsAtom } from '../atom/ChatRoomAtom';
import Modal from '../components/Modal';
import FloatingButton from '../components/FloatingButton';

function ChatRoomListPage () {
  const chatRooms = useAtomValue(chatRoomsAtom);
  const addChatRoom = useAtomValue(addChatRoomAtom);
  const [opponentId, setOpponentId] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [addChatRoomModal, setAddChatRoomModal] = useState(false);


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


  function ChatRoomList() {
    console.log("status", chatRooms.status);
    if(chatRooms.status != 'success') {
      const loadingChatRoomTiles = [];
      for(let i = 0; i < 5; i++) {
        loadingChatRoomTiles.push(<li key={i}><RoomTile user={null} /></li>);
      }
      return <><ul>
        {loadingChatRoomTiles}</ul>
        {chatRooms.status === 'error' && showModal ? <Modal 
        title={<h1 className=''>Error</h1>} 
        body={<p>에러가 발생하였습니다. 잠시후에 다시 시도해 주세요</p>} 
        footer={<button onClick={() => setShowModal(false)} className='w-full bg-primary rounded-md py-2 text-white'>close</button>}
        />: null}
      </>;

    }

    
    console.log(chatRooms.data);
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


  return (
    <div className='flex flex-col h-screen'>
      <AppBar />
      <div className='px-6 py-[0.94rem]'>
        <h1>채팅</h1>
      </div>
      <div className='h-2.5 w-full bg-[#FAFAFA]'></div>
      {ChatRoomList()}
      {AddChatRoomModal()}
      <FloatingButton onClick={() => {setAddChatRoomModal(true)}} />
    </div>
  );

  function AddChatRoomModal() {
    return addChatRoomModal ? <Modal 
      title={<h1 className=''>아이디로 친구 추가하기</h1>} 
      body={
      <form className='flex flex-col gap-4'>
        <input className='w-full border-2 border-primary rounded-md p-2' type='text' placeholder='아이디' value={opponentId} onChange={(e)=>setOpponentId(e.target.value)} />
        <button onClick={async() => {await addChatRoom.mutate({opponentId: [opponentId]});}} className='w-full bg-primary rounded-md py-2 text-white'>Add</button>
      </form>
      } 
      footer={null}
    /> : null;
  }

  
}

export default ChatRoomListPage;