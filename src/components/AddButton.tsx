function AddButton({onClick}: {onClick: () => void}) {
  return <button className='size-12 rounded-full bg-primary p-3' onClick={onClick}>
    <img src='/src/assets/plus.svg' alt='add' />
  </button>;
}

export default AddButton;