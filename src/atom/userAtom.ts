import { atomWithStorage } from 'jotai/utils';
import { User } from '../api/models/User';

export const userAtom = atomWithStorage<User|null>('user', null);


export const userTokenAtom = atomWithStorage<string|null>('userToken', null);

