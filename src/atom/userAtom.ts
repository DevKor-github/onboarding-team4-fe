import { atomWithStorage } from 'jotai/utils';
import { User } from '../api/models/User';

export const userAtom = atomWithStorage<User|null>('user', null);


export const userTokenAtom = atomWithStorage<string|null>('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNhZTBjY2NkMzcxYmE5OWZmNTFiMDYiLCJ1c2VyTmljayI6IkIiLCJwcm9maWxlSW1hZ2UiOiIiLCJzdWIiOiJhc2RmNTY3OCIsImlhdCI6MTcyNDY2NzkyNywiZXhwIjoxNzI0Njc1MTI3fQ.Hw0XTIyI6ID4olk1_-7v1BEXxFsXw6GsrCnwtRrgw8U');

