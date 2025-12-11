const registerCartRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Helper: 간단한 인증 체크 및 현재 유저 ID 반환
  // ==========================================
  const checkAuth = (req, res) => {
    const authHeader = req.headers.authorization;
    console.log("=== checkAuth ===");
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return null;
    }

    const token = authHeader.replace("Bearer ", "");
    const user = db.get("users").find({ uid: token }).value();

    console.log("Found User:", user);

    if (!user) {
      res.status(401).json({ message: "유효하지 않은 토큰입니다." });
      return null;
    }

    return user.id;
  };

  // ==========================================
  // Cart: 장바구니 등록 (POST /api/v1/carts)
  // ==========================================
  server.post("/api/v1/carts", (req, res) => {
    console.log("=== POST /api/v1/carts 요청 ===");

    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    const { courseId } = req.body;
    console.log("CourseId:", courseId, "Type:", typeof courseId);

    if (!courseId) {
      return res.status(400).json({ message: "courseId가 필요합니다." });
    }

    // 강좌 정보 조회
    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();
    if (!course) {
      return res.status(404).json({ message: "강좌를 찾을 수 없습니다." });
    }

    // 카테고리 정보 조회
    const subCategory = db
      .get("categories")
      .find({ id: course.categoryId })
      .value();
    let parentCategory = null;
    if (subCategory?.parentId) {
      parentCategory = db
        .get("categories")
        .find({ id: subCategory.parentId })
        .value();
    }

    // 현재 장바구니 조회
    let cart = db.get("carts").value();

    // 중복 체크
    const existingItem = cart.items.find(
      (item) => item.courseId === Number(courseId)
    );
    if (existingItem) {
      return res
        .status(409)
        .json({ message: "이미 장바구니에 담긴 강의입니다." });
    }

    // 새 아이템 추가
    const newItem = {
      categoryName: parentCategory?.name || subCategory?.name || "",
      subCategoryName: subCategory?.name || "",
      courseId: course.id,
      courseTitle: course.title,
      instructorName: course.instructorName,
      price: course.price,
      coverImgUrl: course.coverImageUrl,
      addedAt: new Date().toISOString(),
    };

    cart.items.push(newItem);
    cart.summary.totalCount = cart.items.length;
    cart.summary.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    db.set("carts", cart).write();

    console.log("✅ 장바구니 추가 성공");

    return res.status(201).json({
      message: "장바구니에 등록되었습니다.",
      data: newItem,
    });
  });

  // ==========================================
  // Cart: 장바구니 목록 조회 (GET /api/v1/carts)
  // ==========================================
  server.get("/api/v1/carts", (req, res) => {
    console.log("=== GET /api/v1/carts 요청 ===");

    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    const cart = db.get("carts").value();

    console.log("장바구니 조회 결과:", cart);

    return res.status(200).json(cart);
  });

  // ==========================================
  // Cart: 장바구니 선택 삭제 (DELETE /api/v1/carts/items)
  // ==========================================
  server.delete("/api/v1/carts/items", (req, res) => {
    console.log("=== DELETE /api/v1/carts/items 요청 ===");

    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "삭제할 courseId가 필요합니다." });
    }

    let cart = db.get("carts").value();
    const itemIndex = cart.items.findIndex(
      (item) => item.courseId === Number(courseId)
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "장바구니에서 해당 강의를 찾을 수 없습니다." });
    }

    const deletedItem = cart.items.splice(itemIndex, 1)[0];
    cart.summary.totalCount = cart.items.length;
    cart.summary.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    db.set("carts", cart).write();

    console.log("✅ 장바구니 항목 삭제 성공");

    return res.status(200).json({
      message: "선택한 강의가 장바구니에서 삭제되었습니다.",
      deletedCourseId: deletedItem.courseId,
    });
  });

  // ==========================================
  // Cart: 장바구니 전체 삭제 (DELETE /api/v1/carts)
  // ==========================================
  server.delete("/api/v1/carts", (req, res) => {
    console.log("=== DELETE /api/v1/carts 요청 ===");

    const currentUserId = checkAuth(req, res);
    if (!currentUserId) return;

    const emptyCart = {
      cart_id: 1,
      items: [],
      summary: {
        totalCount: 0,
        totalAmount: 0,
      },
    };

    db.set("carts", emptyCart).write();

    console.log("✅ 장바구니 전체 삭제 성공");

    return res.status(200).json({ message: "장바구니가 비워졌습니다." });
  });
};

module.exports = registerCartRoutes;
