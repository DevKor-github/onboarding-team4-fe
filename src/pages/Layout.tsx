import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='bg-slate-200'>
      <div className='relative flex flex-col w-96 mx-auto h-full bg-background'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;