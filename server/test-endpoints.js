/**
 * test-endpoint.js
 * - Mock 서버의 상태 및 인증 유효성을 간단히 테스트하기 위한 엔드포인트 모음
 */

const registerTestRoutes = (server, router) => {
  // ==========================================
  // Health Check (GET /api/v1/health)
  // - 서버 상태 확인용 (인증 불필요)
  // ==========================================
  server.get("/api/v1/health", (req, res) => {
    return res.status(200).json({
      status: "ok",
      message: "Mock server is running smoothly.",
      timestamp: new Date().toISOString(),
    });
  });

  // ==========================================
  // Token Check (GET /api/v1/auth/test)
  // - 토큰이 유효한지 확인하는 엔드포인트 (인증 필요)
  // ==========================================
  server.get("/api/v1/auth/test", (req, res) => {
    // mock-server.js의 공통 미들웨어에서 이미 401 처리가 되었을 것입니다.
    // 여기까지 도달했다는 것은 Authorization 헤더가 있다는 의미입니다.

    const authHeader = req.headers.authorization;

    return res.status(200).json({
      message: "토큰 인증 성공. 해당 엔드포인트에 접근 가능합니다.",
      tokenReceived: authHeader,
      mockUser: "user-1", // user-1로 간주
    });
  });
};

module.exports = registerTestRoutes;
