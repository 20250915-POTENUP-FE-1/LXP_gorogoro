import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ROLE } from "@/features/auth/types";

interface UserProfile {
  nickName: string;
  role: ROLE;
}

interface AuthStore {
  userProfile: UserProfile;
  setUser: (data: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userProfile: {
        nickName: "",
        role: "STUDENT",
      },
      setUser: (data: UserProfile) =>
        set({
          userProfile: data,
        }),
      logout: () =>
        set({
          userProfile: {
            nickName: "",
            role: "STUDENT",
          },
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
