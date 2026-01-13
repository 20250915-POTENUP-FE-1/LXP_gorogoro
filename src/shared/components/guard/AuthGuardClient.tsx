'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSession } from '@/shared/components/guard/useSession';

export function AuthGuardClient({ children }: { children: React.ReactNode }) {
  const { data, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.authenticated) router.replace('/login');
  }, [loading, data, router]);

  if (loading) return null;
  return children;
}
