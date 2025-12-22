"use client";

import { useAuthStore } from "@/stores/useAuthStore";

export default function UserInfo() {
  const userProfile = useAuthStore((state) => state.userProfile);
  console.log(userProfile);

  if (!userProfile) {
    return (
      <div aria-label="로그인 안내" role="status">
        로그인을 해보세요
      </div>
    );
  }
  return (
    <div aria-label="사용자 인사말" role="status">
      {userProfile.nickname}님, 안녕하세요!
    </div>
  );
}
