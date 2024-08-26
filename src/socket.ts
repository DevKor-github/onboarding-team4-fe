import { atom } from 'jotai';
import { io } from 'socket.io-client';
import { userTokenAtom } from './atom/userAtom';

export const socketAtom = atom((get) => {
  const token = get(userTokenAtom);
  const socket = io('http://localhost:3000/chat',{
    extraHeaders: {
      authorization: `Bearer ${token}`
    }
  });
  return socket;
});