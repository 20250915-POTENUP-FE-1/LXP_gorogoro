"use client";

import { useAuthStore } from "@/stores/useAuthStore";

export default function UserInfo() {
  const userProfile = useAuthStore((state) => state.userProfile);

  if (!userProfile.nickName) {
    return <div>로그인을 해보세요</div>;
  }

  return <div>{userProfile.nickName}님, 안녕하세요!</div>;
}
