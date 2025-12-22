"use client";

import { getMe } from "@/services/user.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export default function AuthHydrator() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMe();
      } catch (error) {
        console.log(error);
      }
    })();
  });
  return <div>Enter</div>;
}
