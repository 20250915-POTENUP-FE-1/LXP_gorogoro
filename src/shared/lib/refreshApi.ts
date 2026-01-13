import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const refreshApi = async (error: { status: number }) => {
  if (error?.status === 401) {
    const h = await headers();
    const pathname = h.get('x-pathname') ?? '/';
    const search = h.get('x-search') ?? '';
    redirect(`/api/refresh?callback=${encodeURIComponent(`${pathname}${search}`)}`);
  }
  throw error;
};
