function MessageBubble() {
  return (
    <div className='relative block m-5 w-fit p-5 max-w-[90%] rounded-[1rem] rounded-br-none min-h-[2.75rem] min-w-[2.75rem] bg-slate-600 text-[oklch(var(--nc)/var(--tw-text-opacity))]'>
      <div
        className='absolute end-[-0.75rem] bottom-0 h-[0.75rem] w-[0.75rem] bg-inherit'
        style={{
          content: '""',
          maskImage: 'url(/message_bubble_mask.svg)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      ></div>
      <p>Message Bubble</p>
    </div>
  );
}

export default MessageBubble;