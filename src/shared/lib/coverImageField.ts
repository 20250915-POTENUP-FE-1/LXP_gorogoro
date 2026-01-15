'use client';

import { useCallback, useEffect, useState } from 'react';

const LS_PREFIX = 'ls://';

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

type UseLocalStorageImageOptions = {
  initial?: string;
  bucket?: string; // localStorage key prefix
};
function resolvePreview(initial?: string) {
  if (!initial) return '';
  if (initial.startsWith(LS_PREFIX)) {
    const key = initial.slice(LS_PREFIX.length); // courseCover:uuid
    return localStorage.getItem(key) ?? '';
  }
  return initial; // http(s)://... or /...
}

export function useLocalStorageImage(opts: UseLocalStorageImageOptions = {}) {
  const bucket = opts.bucket ?? 'courseCover:';
  const [preview, setPreview] = useState<string>('');
  const [storedRef, setStoredRef] = useState<string>(''); // 서버로 보낼 값(최종은 URL이어야 함)

  useEffect(() => {
    const init = opts.initial ?? '';
    setPreview(resolvePreview(init));
    setStoredRef(init); // 일단 "변경 없으면 기존 값 그대로" 유지
  }, [opts.initial]);

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const dataUrl = await fileToDataUrl(file);
      const key = `${bucket}${crypto.randomUUID()}`;

      localStorage.setItem(key, dataUrl);

      setPreview(dataUrl);
      setStoredRef(`${LS_PREFIX}${key}`); // ✅ 여기까진 '임시 참조'
    },
    [bucket],
  );

  const clear = useCallback(() => {
    setPreview('');
    setStoredRef('');
  }, []);

  return { preview, storedRef, onFileChange, clear };
}
