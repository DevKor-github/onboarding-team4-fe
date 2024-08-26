import { ChatGroup } from '../api/models/chatModel';
import MessageBubble from './messageBubble';
import { MessageBubbleType, MessageGroupType } from './messageBubbleType';

function MessageGroup({type, data}: {type: MessageGroupType, data: ChatGroup}) {
  const className = {
    [MessageGroupType.LEFT]: {
      row: 'justify-start',
      col: 'items-start',
    },
    [MessageGroupType.RIGHT]: {
      row: 'justify-end',
      col: 'items-end',
    },
  }[type];
  
  return (
    <div className={`flex flex-row w-full flex-1 ${className["row"]}`}>
      {type === MessageGroupType.LEFT ?  <div className='w-8 h-8'>
        <img src={data.img} alt="profile img" />
      </div> : null}
      <div className={`flex flex-col max-w-64 ${className["col"]}`}>
        
        {data.chats.map((chat, index) => (

          <MessageBubble key={index} type={ index !== 0 ? MessageBubbleType.NONE :  type === MessageGroupType.LEFT ? MessageBubbleType.LEFT : MessageBubbleType.RIGHT} senderName={data.senderName} data={chat}/>
        ))}
      </div>
    </div>
    
  );
}

export default MessageGroup;