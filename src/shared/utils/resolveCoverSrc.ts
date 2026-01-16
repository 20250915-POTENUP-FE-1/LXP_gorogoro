export const resolveCoverSrc = (url?: string | null) => {
  console.log(url);
  if (!url || url.trim() === '') {
    return '/assets/placeholder.png';
  }

  if (url.startsWith('ls://')) {
    const key = url.replace('ls://', '');

    // 1. 서버 사이드 환경(Node.js)인지 체크
    if (typeof window === 'undefined') {
      // 서버에서는 localStorage에 접근할 수 없으므로 기본 이미지 반환
      return '/assets/placeholder.png';
    }

    // 2. 브라우저 환경일 때만 localStorage 호출
    const saved = localStorage.getItem(key);
    return saved ?? '/assets/placeholder.png';
  }

  return url;
};
