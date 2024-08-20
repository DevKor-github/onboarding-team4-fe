export interface Chat {
  senderId: string;
  senderName: string;
  content: string;
  contentType: string;
  time: string;
  room: string;
}

export interface ChatWithoutSender {
  content: string;
  contentType: string;
  time: string;
}

export interface ChatGroup {
  senderId: string;
  senderName: string;
  img: string;
  chats: ChatWithoutSender[];
}
