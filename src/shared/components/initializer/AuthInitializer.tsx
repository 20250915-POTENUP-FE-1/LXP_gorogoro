'use client';

import { ROLE } from '@/features/auth/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { usePathname } from 'next/dist/client/components/navigation';

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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login' || pathname === '/signup') {
      clearUser();
      return;
    }
    let ignore = false;
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', {
          cache: 'no-store',
          credentials: 'include',
        });
        if (res.status === 401) {
          // 로그인 안 한 상태는 정상 상태
          clearUser();
          return;
        }
        if (!res.ok) {
          // 서버 문제(500 등)만 로깅/에러 UI 처리
          throw new Error('ME API failed');
        }
        const me: MeResponse = await res.json();
        if (!ignore) {
          setUser({ nickname: me.nickname, role: me.role, email: me.email });
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
  }, [setUser, clearUser, pathname]);

  return null;
}
