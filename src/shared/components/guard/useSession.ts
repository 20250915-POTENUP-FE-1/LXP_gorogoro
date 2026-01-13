'use client';

import { useCallback, useEffect, useState } from 'react';

type Session = { authenticated: boolean };

let cache: Session | null = null;
let inflight: Promise<Session> | null = null;

async function fetchSession(signal?: AbortSignal): Promise<Session> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch('/api/session', {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    signal,
  })
    .then(async (res) => {
      if (!res.ok) return { authenticated: false };
      return (await res.json()) as Session;
    })
    .finally(() => {
      inflight = null;
    });

  const data = await inflight;
  cache = data;
  return data;
}

export function useSession() {
  const [data, setData] = useState<Session | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<unknown>(null);

  const refresh = useCallback(async () => {
    cache = null;
    setLoading(true);
    setError(null);
    try {
      const next = await fetchSession();
      setData(next);
      return next;
    } catch (e) {
      setError(e);
      setData({ authenticated: false });
      return { authenticated: false };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cache) return;

    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const next = await fetchSession(ac.signal);
        setData(next);
      } catch (e) {
        if (!ac.signal.aborted) {
          setError(e);
          setData({ authenticated: false });
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return { data: data ?? { authenticated: false }, loading, error, refresh };
}
