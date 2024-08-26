import { getData, deleteData } from '../../utils/APIUtils';
import { Chat } from '../models/chatModel';

export const getChats = async (): Promise<Chat[]> => {
  return await getData<Chat[]>('/chats');
}

export const deleteChat = async (chatId: number): Promise<Chat> => {
  return await deleteData<Chat>(`/chats/${chatId}`, {});
}