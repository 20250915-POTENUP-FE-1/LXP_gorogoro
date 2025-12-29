export function decodeJWT(
  accessToken: string
): { role?: string; nickname?: string } | null {
  try {
    // JWT 구조: header.payload.signature
    const parts = accessToken.split(".");
    if (parts.length !== 3) return null;

    // payload 부분 (인덱스 1)을 Base64 디코딩
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch {
    return null;
  }
}
