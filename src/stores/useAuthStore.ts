import { create } from "zustand";

import { loginAction } from "@/features/auth/actions";

interface UserProfile {
  nickName: string;
  role: "student" | "instructor" | "admin";
}

interface AuthStore {
  userProfile: UserProfile;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  userProfile: {
    nickName: "",
    role: "student",
  },
  login: async () => {
    const loginResponse = await loginAction();
    set({
      userProfile: {
        nickName: loginResponse.user.nickName,
        role: loginResponse.user.role,
      },
    });
  },
  logout: () => set({ userProfile: { nickName: "", role: "student" } }),
}));

export default useAuthStore;
