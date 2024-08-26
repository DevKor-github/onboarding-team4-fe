import plusImage from '../assets/plus.svg';

function AddButton({onClick}: {onClick: () => void}) {
  return <button className='size-12 rounded-full bg-primary p-3' onClick={onClick}>
    <img src={plusImage} alt='add' />
  </button>;
}

export default AddButton;