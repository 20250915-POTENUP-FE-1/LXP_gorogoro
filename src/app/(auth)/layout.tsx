import { AuthGuardClient } from '@/shared/components/guard/AuthGuardClient';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const refreshToken = cookieStore.get('refreshToken')?.value;
  //
  // if (!refreshToken) redirect('/login');
  //
  // return <AuthGuardClient>{children}</AuthGuardClient>;
  return children;
}
