import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { ChatRoom } from '../api/models/ChatRoom';
import { getData, postData } from '../utils/APIUtils';
import { axiosAtom } from '../pages/axiosAtom';

export const chatRoomsAtom = atomWithQuery<ChatRoom[]>((get) => ({
  queryKey: ['chatRooms'],
  queryFn: async (): Promise<ChatRoom[]> => {
    const client = get(axiosAtom);
    return getData<ChatRoom[]>('/user/getChatrooms', client);
  },
}));

// const chatRoomIdAtom = atom<string | null>(null);

// const chatRoomAtom = atomWithQuery<ChatRoom>((get) => ({
//   queryKey: ['chatRoom', get(chatRoomIdAtom)],
//   queryFn: async ({queryKey: [, chatRoomId]}): Promise<ChatRoom> => {
//     return getData<ChatRoom>(`/user/getChatrooms/${chatRoomId}`);
//   },
// }));

export const addChatRoomAtom = atomWithMutation<ChatRoom, {opponentId: string[]}>((get) => ({
  mutationKey: ['addChatRoom'],
  mutationFn: async ({opponentId}): Promise<ChatRoom> => {
    console.log(opponentId);
    const client = get(axiosAtom);
    return postData<ChatRoom, {opponents: string[]}>('/user/makeChatroom', client, {opponents: opponentId});
  },
  onError: (error) => {
    console.error(error);
  },
  onSuccess: (result) => {
    console.log(result);
  }
})); 


