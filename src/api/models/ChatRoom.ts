import { User } from "./User";


export interface ChatRoom {
  _id: string;
  memberList: User[];
}

