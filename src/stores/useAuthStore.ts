import { create } from "zustand";
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

const useAuthStore = create<AuthStore>((set) => ({
  userProfile: {
    nickName: "",
    role: "STUDENT",
  },
  setUser: (data: UserProfile) => {
    set({
      userProfile: data,
    });
  },
  logout: () => set({ userProfile: { nickName: "", role: "STUDENT" } }),
}));

export default useAuthStore;
