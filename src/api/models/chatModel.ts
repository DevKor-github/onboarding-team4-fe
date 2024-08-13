export interface Chat {
  senderId: number;
  userNick: string;
  content: string;
  contentType: string;
  timestamp: Date;
  room: string;
}
