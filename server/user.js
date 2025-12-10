const registerUserRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Auth: 회원가입 (POST /api/v1/auth/register)
  // ==========================================
  server.post("/api/v1/auth/register", (req, res) => {
    const { email, password, name, role, nickname } = req.body;

    // 이메일 중복 체크
    const existingUser = db.get("users").find({ email }).value();
    if (existingUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    const newUser = {
      id: "user-" + Date.now(), // String ID
      uid: "firebase-uid-" + Date.now(),
      email,
      password,
      name,
      role: role || "student", // Default role
      createdAt: new Date().toISOString(),
    };

    db.get("users").push(newUser).write();

    const { password: _, ...userInfo } = newUser;

    return res.status(201).json({
      message: "회원가입 성공",
      user: userInfo,
    });
  });

  // ==========================================
  // Auth: 로그인 (POST /api/v1/auth/login)
  // ==========================================
  server.post("/api/v1/auth/login", (req, res) => {
    const { email, password } = req.body;

    // 유저 찾기
    const user = db.get("users").find({ email, password }).value();

    if (user) {
      // 비밀번호 제외
      const { password: _, ...userInfo } = user;

      const accessToken = "fake_access_token_" + Date.now();
      const refreshToken = "fake_refresh_token_" + Date.now();

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: userInfo,
      });
    } else {
      return res
        .status(401)
        .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
    }
  });

  // ==========================================
  // Auth: 리프레시 토큰 (POST /api/v1/auth/refresh)
  // ==========================================
  server.post("/api/v1/auth/refresh", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "리프레시 토큰이 필요합니다." });
    }

    // 실제 검증 로직 생략, 무조건 성공 간주
    return res.status(200).json({
      accessToken: "fake_access_token_" + Date.now(),
      message: "토큰이 갱신되었습니다.",
    });
  });

  // ==========================================
  // User: 내 정보 수정 (PATCH /api/v1/users/modify)
  // ==========================================
  server.patch("/api/v1/users/modify", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // Mock: 토큰 디코딩 대신, body나 query로 userId를 받는 것이 일반적이지만,
    // 여기서는 편의상 헤더가 있으면 'user-1' (김수강)을 수정한다고 가정하거나,
    // 테스트를 위해 'user-1'을 하드코딩해서 수정합니다.
    // 실제로는 토큰에서 User ID를 추출해야 합니다.
    const currentUserId = "user-1";

    const user = db.get("users").find({ id: currentUserId }).value();

    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    const { email, password, name, nickname } = req.body;

    // 업데이트 할 항목 준비
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (name) updates.displayName = name;
    if (nickname) updates.displayName = nickname; // 닉네임 -> displayName 매핑

    db.get("users").find({ id: currentUserId }).assign(updates).write();

    // 업데이트 된 최신 정보 조회
    const updatedUser = db.get("users").find({ id: currentUserId }).value();
    const { password: _, ...userInfo } = updatedUser;

    return res.status(200).json({
      message: "회원 정보가 수정되었습니다.",
      user: userInfo,
    });
  });

  // ==========================================
  // User: 회원 탈퇴 (DELETE /api/v1/users/leave)
  // ==========================================
  server.delete("/api/v1/users/leave", (req, res) => {
    // 위와 동일하게 'user-1'로 가정
    const currentUserId = "user-1";

    const user = db.get("users").find({ id: currentUserId }).value();
    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    db.get("users").remove({ id: currentUserId }).write();

    return res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
  });

  // ==========================================
  // User: 내 정보 조회 (GET /api/v1/users/me)
  // ==========================================
  server.get("/api/v1/users/me", (req, res) => {
    const authHeader = req.headers.authorization;
    // 간편한 테스트를 위해 토큰이 없으면 에러, 있으면 'user-1' 반환
    if (!authHeader) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // 실제론 토큰 해석 필요. 여기선 user-1 고정.
    const currentUserId = "user-1";
    const user = db.get("users").find({ id: currentUserId }).value();

    if (user) {
      const { password, ...userInfo } = user;
      res.json(userInfo);
    } else {
      res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }
  });
};

module.exports = registerUserRoutes;
