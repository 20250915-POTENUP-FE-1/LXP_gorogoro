import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ROLE } from '@/features/auth/types';

type UserProfile = {
  userId: number;
  name: string;
  email: string;
  role?: ROLE;
};
interface AuthStore {
  userProfile: UserProfile | null; // 유저 프로필
  setUser: (user: UserProfile) => void; // 로그인/유저정보 갱신 (항상 객체)
  clearUser: () => void; // 로그아웃 (null로 초기화)
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      setUser: (user: UserProfile) => set({ userProfile: user }),
      clearUser: () => set({ userProfile: null }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => localStorage) },
  ),
);
