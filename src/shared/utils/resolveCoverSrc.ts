export function resolveCoverSrc(url: string) {
  if (!url) return '/assets/placeholder.png';

  if (url.startsWith('ls://')) {
    const key = url.replace('ls://', ''); // courseCover:uuid
    const saved = localStorage.getItem(key); // 보통 dataURL 저장해둔 경우
    return saved ?? '/assets/placeholder.png';
  }

  return url; // http/https or /...
}
