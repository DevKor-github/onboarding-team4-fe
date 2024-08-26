import { atomWithQuery } from 'jotai-tanstack-query';
import { ChatRoom } from '../api/models/ChatRoom';
import { getData } from '../utils/APIUtils';
import { atom } from 'jotai';

export const chatRoomsAtom = atomWithQuery<ChatRoom[]>(() => ({
  queryKey: ['chatRooms'],
  queryFn: async (): Promise<ChatRoom[]> => {
    return getData<ChatRoom[]>('/chat-rooms');
  },
}));

const chatRoomIdAtom = atom<string | null>(null);

const chatRoomAtom = atomWithQuery<ChatRoom>((get) => ({
  queryKey: ['chatRoom', get(chatRoomIdAtom)],
  queryFn: async ({queryKey: [, chatRoomId]}): Promise<ChatRoom> => {
    return getData<ChatRoom>(`/chat-rooms/${chatRoomId}`);
  },
}));

