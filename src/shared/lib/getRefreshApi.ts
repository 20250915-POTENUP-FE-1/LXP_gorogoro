import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getRefreshApi = async (error: unknown) => {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number(error.status)
      : undefined;

  if (status === 401) {
    const h = await headers();
    const pathname = h.get('x-pathname') ?? '/';
    const search = h.get('x-search') ?? '';
    redirect(`/api/refresh?callback=${encodeURIComponent(`${pathname}${search}`)}`);
  }
  throw error;
};
