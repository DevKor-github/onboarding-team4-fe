import axios from 'axios';
import { atom } from 'jotai';
import { userTokenAtom } from '../atom/userAtom';

export const axiosAtom = atom((get) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
      "Content-Type": "application/json",
    },
  });
  client.interceptors.request.use((config) => {
    const token = get(userTokenAtom);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config.url);
    return config;
  });
  return client;
});
