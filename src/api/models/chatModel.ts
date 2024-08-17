export interface Chat {
  id: number;
  senderId: number;
  content: string;
  contentType: string;
  time: Date;
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