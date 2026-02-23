type CookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  sameSite?: 'lax' | 'strict' | 'none';
  secure?: boolean;
  httpOnly?: boolean;
};

export default function parseSetCookie(setCookie: string) {
  const parts = setCookie.split(';').map((p) => p.trim());
  const [nameValue, ...attrs] = parts;

  const eqIdx = nameValue.indexOf('=');
  if (eqIdx < 0) return null;

  const name = nameValue.slice(0, eqIdx);
  const value = nameValue.slice(eqIdx + 1);

  const options: CookieOptions = {};

  for (const a of attrs) {
    const [rawK, ...rawV] = a.split('=');
    const k = rawK.toLowerCase();
    const v = rawV.join('=');

    if (k === 'path') options.path = v || '/';
    else if (k === 'domain') options.domain = v;
    else if (k === 'max-age') options.maxAge = Number(v);
    else if (k === 'expires') {
      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) options.expires = d;
    } else if (k === 'samesite') {
      const s = v.toLowerCase();
      if (s === 'lax' || s === 'strict' || s === 'none') options.sameSite = s;
    } else if (k === 'secure') options.secure = true;
    else if (k === 'httponly') options.httpOnly = true;
  }
  return { name, value, options };
}
