import{ User } from '../api/models/User';

function UserWithImg({user}: {user: User}) {
  return (
    <div className='h-5 flex flex-row items-center gap-2'>
      <img className='h-full' src={user.profileImage} alt={user.userNick} />
      <span className=' text-sm h-fit'>{user.userNick}</span>
    </div>
  );
}

export default UserWithImg;