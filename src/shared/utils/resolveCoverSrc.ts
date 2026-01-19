'use client';
import { useEffect, useState } from 'react';

const PLACEHOLDER = '/assets/placeholder.png';

export function useResolveCoverSrc(url?: string | null) {
  const [src, setSrc] = useState(() => {
    if (!url) return PLACEHOLDER;
    if (url.startsWith('ls://')) return PLACEHOLDER;
    return url;
  });

  useEffect(() => {
    if (!url) return setSrc(PLACEHOLDER);

    if (!url.startsWith('ls://')) {
      setSrc(url);
      return;
    }

    const key = url.replace('ls://', '');
    const saved = localStorage.getItem(key);
    setSrc(saved ?? PLACEHOLDER);
  }, [url]);

  return src;
}
