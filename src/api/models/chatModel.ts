export interface Chat {
  senderId: number;
  userNick: string;
  content: string;
  contentType: string;
  time: Date;
  room: string;
}

export interface ChatWithoutSender {
  id: number;
  content: string;
  contentType: string;
  time: Date;
}


export interface ChatList {
  senderName: string;
  img: string;
  chats: ChatWithoutSender[];
}