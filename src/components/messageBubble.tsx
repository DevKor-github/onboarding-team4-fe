import { ChatWithoutSender } from '../api/models/chatModel';
import { MessageBubbleType } from './messageBubbleType';

function MessageBubble({type, senderName, data}: {type: MessageBubbleType, senderName: string, data: ChatWithoutSender}) {

  const className = {
    [MessageBubbleType.LEFT]: {
      messageBubble: "rounded-tl-none before:-start-2 before:[mask-image:url('./assets/message_bubble_right_mask.svg')]",
      sender: '',
    },
    [MessageBubbleType.RIGHT]: {
      messageBubble: "rounded-tr-none before:-end-2 before:[mask-image:url('./assets/message_bubble_left_mask.svg')]",
      sender: 'hidden',
    },
    [MessageBubbleType.NONE]: {
      messageBubble: '',
      sender: 'hidden',
    },
  }[type];

  const className2 = {
    text: "text-left text-sm ",
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className={`message-bubble ${className.messageBubble}`}>
      <div className=' flex flex-col justify-start'>
        <p className={`${className2.text} ${className.sender} font-bold`}>{senderName}</p>
        <p className={`${className2.text} py-1 break-words`}>{data.content}</p>
        <div className='flex flex-row justify-end'>
          <p className='text-xs'>{formatTime(new Date(data.time))}</p>
          <img className='px-1' src="/src/assets/check.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;