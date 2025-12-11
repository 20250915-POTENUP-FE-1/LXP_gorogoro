const registerCartRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Helper: 간단한 인증 체크 및 현재 유저 ID 반환
  // ==========================================
  const checkAuth = (req, res) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   res.status(401).json({ message: "로그인이 필요합니다." });
    //   return null;
    // }
    // user.js와 동일하게 테스트를 위해 'user-1'로 하드코딩
    return "user-1";
  };

  // ==========================================
  // Cart: 장바구니 등록 (POST /api/v1/carts)
  // ==========================================
  server.post("/api/v1/carts", (req, res) => {
    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId가 필요합니다." });
    }

    // 1. 이미 장바구니에 있는지 중복 체크
    const existingItem = db
      .get("carts")
      .find({ userId: currentUserId, courseId: Number(courseId) })
      .value();

    if (existingItem) {
      return res
        .status(409)
        .json({ message: "이미 장바구니에 담긴 강의입니다." });
    }

    // 2. 장바구니에 추가
    const newCartItem = {
      id: "cart-" + Date.now(),
      userId: currentUserId,
      courseId: Number(courseId), // ID는 숫자로 관리하는 것이 일반적
      createdAt: new Date().toISOString(),
    };

    db.get("carts").push(newCartItem).write();

    // 3. (선택사항) 응답 시 강의 상세 정보가 필요하다면 db.get('courses')에서 찾아 병합할 수 있습니다.
    // 여기서는 등록된 장바구니 아이템 자체를 반환합니다.
    return res.status(201).json({
      message: "장바구니에 등록되었습니다.",
      data: newCartItem,
    });
  });

  // ==========================================
  // Cart: 장바구니 목록 조회 (GET /api/v1/carts)
  // ==========================================
  server.get("/api/v1/carts", (req, res) => {
    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    // 해당 유저의 장바구니 목록 조회
    const myCartItems = db
      .get("carts")
      .filter({ userId: currentUserId })
      .value();

    // *Senior Tip*: 실제 서비스에선 여기서 courseId를 이용해 Courses 테이블과 Join하여
    // 강의 제목, 썸네일, 가격 등을 함께 내려줍니다.
    // Mock Server에 'courses' 컬렉션이 있다면 아래처럼 매핑해서 내려주면 더 리얼합니다.

    const detailedItems = myCartItems.map((item) => {
      const course = db.get("courses").find({ id: item.courseId }).value();
      return { ...course };
    });

    return res.status(200).json(detailedItems);
  });

  // ==========================================
  // Cart: 장바구니 선택 삭제 (DELETE /api/v1/carts/items)
  // 명세: /api/v1/carts/items?courseId=3
  // ==========================================
  server.delete("/api/v1/carts/items", (req, res) => {
    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    // Query String에서 courseId 추출
    const { courseId } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ message: "삭제할 courseId가 파라미터로 필요합니다." });
    }

    // 해당 유저의 특정 강의 삭제
    const itemToRemove = db
      .get("carts")
      .find({ userId: currentUserId, courseId: Number(courseId) })
      .value();

    if (!itemToRemove) {
      return res
        .status(404)
        .json({ message: "장바구니에서 해당 강의를 찾을 수 없습니다." });
    }

    db.get("carts")
      .remove({ userId: currentUserId, courseId: Number(courseId) })
      .write();

    return res.status(200).json({
      message: "선택한 강의가 장바구니에서 삭제되었습니다.",
      deletedId: itemToRemove.id,
    });
  });

  // ==========================================
  // Cart: 장바구니 전체 삭제 (DELETE /api/v1/carts)
  // ==========================================
  server.delete("/api/v1/carts", (req, res) => {
    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    // 해당 유저의 모든 장바구니 아이템 삭제
    db.get("carts").remove({ userId: currentUserId }).write();

    return res.status(200).json({ message: "장바구니가 비워졌습니다." });
  });
};

module.exports = registerCartRoutes;
