"use client";

import { ROLE } from "@/features/auth/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

type MeResponse = {
  id: number;
  username: string;
  nickname: string;
  email: string;
  role: ROLE;
  createdAt: string;
};

// 앱 시작시 1회 검증 + store 동기화
export default function AuthInitializer() {
  const setUser = useAuthStore((state) => state.setUser); // 함수 가져오기
  const clearUser = useAuthStore((state) => state.clearUser); // 함수 가져오기

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          credentials: "include",
        });
        console.log("status", res.status);
        console.log("set-cookie?", res.headers.get("set-cookie")); // route handler에서만 의미

        if (!res.ok) throw new Error("unauthorized");
        const me: MeResponse = await res.json();
        if (!ignore) {
          setUser({ nickname: me.nickname, role: me.role });
        }
      } catch (error) {
        if (!ignore) {
          clearUser();
          console.log(error);
        }
      }
    };
    void fetchUser();
    return () => {
      ignore = true;
    };
  }, [setUser, clearUser]);

  return null;
}
