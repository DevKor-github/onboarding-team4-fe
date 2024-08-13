import { atom } from 'jotai';
import { Chat } from '../api/models/chatModel';

export const chatAtom = atom<Chat[]>([]);

export const addChatsAtom = atom(null, (get, set, chats: Chat[]) => {
  set(chatAtom, [...get(chatAtom), ...chats]);
})