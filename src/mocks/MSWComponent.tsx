'use client';

import { useEffect, useState } from 'react';
import { initMocks } from './index';

export function MSWComponent({ children }: { children: React.ReactNode }) {
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initMocks();
      setFetching(false);
    };
    init();
  }, []);

  if (process.env.NODE_ENV !== 'development') return <>{children}</>;
  if (fetching) return null;

  return <>{children}</>;
}
