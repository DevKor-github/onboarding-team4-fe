import { atom } from 'jotai';
import { io } from 'socket.io-client';

import { userTokenAtom } from './atom/userAtom';

export const socketAtom = atom((get) => {
  const token = get(userTokenAtom);
  const socket = io(`${import.meta.env.VITE_API_URL as string}/chat`,{
    extraHeaders: {
      authorization: `Bearer ${token}`
    }
  });
  return socket;
});

