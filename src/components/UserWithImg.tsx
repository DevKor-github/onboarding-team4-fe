import{ User } from '../api/models/User';

function UserWithImg({user}: {user: User}) {
  return (
    <div className='flex flex-row gap-2'>
      <img src={user.profileImage} alt={user.userNick} />
      <span>{user.userNick}</span>
    </div>
  );
}

export default UserWithImg;