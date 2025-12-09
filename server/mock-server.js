const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ==========================================
// 1. 핵심 모듈 불러오기 (Import Core Modules)
// ==========================================
const registerUserRoutes = require("./user");
const registerCartRoutes = require("./cart");
const registerCourseRoutes = require("./course");
const registerInteractionRoutes = require("./interaction");
const registerCategoryRoutes = require("./category");
const registerTestRoutes = require("./test-endpoints");

// 기본 포트 설정
const PORT = 3002;

// 기본 미들웨어 설정 (Logger, Static files serving 등)
server.use(middlewares);
server.use(jsonServer.bodyParser); // POST/PUT/PATCH 요청 본문을 JSON으로 파싱

// ==========================================
// 2. Mock 라우트 등록 (Register Custom Routes)
// ==========================================
registerUserRoutes(server, router);
registerCartRoutes(server, router);
registerCourseRoutes(server, router);
registerInteractionRoutes(server, router);
registerCategoryRoutes(server, router);

registerTestRoutes(server, router);

// ==========================================
// 3. 통합 인증 및 공통 미들웨어 가드
// ==========================================
server.use((req, res, next) => {
  // // 공통적으로 인증이 필요 없는 경로 설정
  // const publicPaths = [
  //   "/api/v1/auth/login",
  //   "/api/v1/auth/register",
  //   "/api/v1/auth/refresh",
  // ];

  // // **GET 요청**은 대부분 공개 (카테고리, 코스 목록, 리뷰 목록 등)
  // // 단, 내 정보 조회(/api/v1/users/me)와 같은 예외는 모듈 내에서 처리합니다.
  // if (req.method === "GET") {
  //   return next();
  // }

  // // POST, PUT, DELETE 등 쓰기 요청에 대한 최소한의 인증 체크
  // if (!publicPaths.includes(req.path)) {
  //   const authHeader = req.headers.authorization;

  //   // 모든 쓰기 작업은 Bearer 토큰이 필요합니다.
  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return res
  //       .status(401)
  //       .json({ message: "인증이 필요합니다. Bearer 토큰을 포함해야 합니다." });
  //   }

  //   // 실제로는 토큰 검증 로직이 들어갈 자리입니다.
  // }

  // 통과
  next();
});

// ==========================================
// 4. JSON Server 기본 라우팅 설정
// ==========================================
// db.json의 리소스를 /api/v1/* 형태로 접근 가능하게 함
// (POST, PUT, DELETE 요청 시 데이터베이스에 반영됨)
server.use("/api/v1", router);

// ==========================================
// 5. 서버 구동
// ==========================================
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on http://localhost:${PORT}`);
  console.log(`📌 Base URL: http://localhost:${PORT}/api/v1`);
  console.log(
    `- 커스텀 라우트: user, cart, course, interaction, category 등록 완료.`
  );
});
