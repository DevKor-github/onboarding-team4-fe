import { useState } from 'react';
import smiley from '../assets/smiley.svg';

function MessageField({onSend, onVaidation}: {onSend: (message: string) => void, onVaidation: (message: string) => boolean}) {
  const [message, setMessage] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if(onVaidation(message)){
      onSend(message);
      setMessage("");
    }
  }

  return (
    <div className='flex flex-row gap-3 px-6 pt-3 pb-7 z-10 shadow-top-xs bg-background' onSubmit={onSubmit}>
      <button>
        <img className='w-6 h-6' src={smiley} alt="" />
      </button>
      <form className='w-full flex flex-row gap-4 py-3 px-5 rounded-full bg-onBackground'>
        <input value={message} placeholder='Start typing...' onChange={(e) =>setMessage(e.target.value)} className='flex-1 bg-transparent focus:border-none focus:outline-none' type="text" />
        <button type='submit' className='w-fit'><img className='h-4 w-4' src="/src/assets/paper-airplane.svg" alt="" /></button>
      </form>
    </div>
  );
}

export default MessageField;