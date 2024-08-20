import UserWithImg from './UserWithImg'
import { ChatRoom } from '../api/models/ChatRoom';
import { User } from '../api/models/User';

function RoomTile({ user }: { chatRoom: ChatRoom, user: User }) {
  return (
    <div className='flex flex-row justify-between h-[3.875rem] py-4 px-6'>
      <UserWithImg user={user} />
      <div>
        <span className='text-sm'>오후 8:00</span>
      </div>
    </div>
  );
}

export default RoomTile;