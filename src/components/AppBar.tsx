function AppBar() {
  return (
    <div className='flex flex-row justify-start items-center px-6 py-[0.94rem] bg-[#FAFAFA] gap-1'>
      <div>
        <img className='h-4 w-4' src='/src/assets/devkor.svg' alt='logo'/>
      </div>
      <h2 className='font-bold text-md text-center text-label-200'>DEVKOR</h2>
    </div>
  );
}

export default AppBar;