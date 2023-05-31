import { create } from 'zustand';

import { createSelectors } from './createSelectors';

type User = {
  fullName: string;
  email: string;
  phone: string;
};

type UserStore = {
  user: User | null;
  update: (user: User) => void;
};

const authStore = create<UserStore>()((set) => ({
  user: null,
  update: (user: User) => set({ user }),
}));

export const useAuthStore = createSelectors(authStore);
