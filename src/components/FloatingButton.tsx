import AddButton from './AddButton';

function FloatingButton({onClick}: {onClick: () => void}) {
  return (
    <div className=' absolute bottom-8 right-8'>
      <AddButton onClick={onClick} />
    </div>
  );
}

export default FloatingButton;