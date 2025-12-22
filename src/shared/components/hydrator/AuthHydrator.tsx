"use client";

import { ROLE } from "@/features/auth/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

type MeRsponse = {
  id: number;
  username: string;
  nickname: string;
  email: string;
  role: ROLE;
  createdAt: string;
};

// 앱 시작시 1회 검증 + store 동기화
export default function AuthHydrator() {
  const setUser = useAuthStore((state) => state.setUser); // 함수 가져오기
  const clearUser = useAuthStore((state) => state.clearUser); // 함수 가져오기

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("unauthorized");
        const me: MeRsponse = await res.json();
        if (!ignore) {
          setUser({ nickname: me.nickname, role: me.role });
        }
      } catch (error) {
        if (!ignore) {
          clearUser();
          console.log(error);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [setUser, clearUser]);
  return null;
}
