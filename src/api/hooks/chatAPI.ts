import { getData } from '../../utils/APIUtils';
import { Chat } from '../models/chatModel';

export const getChats = async (): Promise<Chat[]> => {
  return await getData<Chat[]>('/chats');
}
