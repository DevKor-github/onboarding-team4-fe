import{ User } from '../api/models/User';

function UserWithImg({user}: {user: User | null}) {

  if(user === null) {
    return <div className='flex flex-row items-center gap-5 w-full'>
    <div className='loading-placeholder size-8 rounded-full bg-onBackground'></div>
    <div className='loading-placeholder h-4 w-40 rounded-full bg-onBackground'></div>
  </div>
  }
  return (
    <div className='flex flex-row items-center gap-2'>
      <img className='h-full' src={user?.profileImage ?? '/src/assets/profile_image_plain.svg'} alt={user?.userNick ?? ''} />
      <span className=' text-sm h-fit'>{user?.userNick}</span>
    </div>
  );
}

export default UserWithImg;