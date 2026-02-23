export async function initMocks() {
  if (typeof window === 'undefined') {
    // 서버 환경(Node.js) - 서버 액션 등 처리
    const { server } = await import('./node');
    server.listen({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Server-side mocking enabled.');
  } else {
    // 브라우저 환경 - 클라이언트 fetch 처리
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Client-side mocking enabled.');
  }
}
