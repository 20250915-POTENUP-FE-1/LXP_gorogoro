const registerInteractionRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Helper: 인증 및 유저 ID 체크
  // ==========================================
  const checkAuth = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return null;
    }
    return "user-1"; // 테스트용 고정 유저
  };

  // ================================================================
  // 1. Review Endpoint (수강평)
  // URL: /courses/{courseId}/reviews
  // ================================================================

  // [GET] 특정 강의의 리뷰 목록 조회 (화면 렌더링용 추가)
  server.get("/courses/:courseId/reviews", (req, res) => {
    const { courseId } = req.params;

    // 해당 강의에 달린 리뷰만 필터링
    const reviews = db
      .get("reviews")
      .filter({ courseId: Number(courseId) })
      .value();

    return res.status(200).json(reviews);
  });

  // [POST] 리뷰 등록
  server.post("/courses/:courseId/reviews", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { courseId } = req.params;
    const { title, comment, stars } = req.body;

    if (!title || !comment || !stars) {
      return res
        .status(400)
        .json({ message: "제목, 내용, 별점은 필수입니다." });
    }

    const newReview = {
      id: "review-" + Date.now(),
      userId,
      courseId: Number(courseId),
      title,
      comment,
      stars: Number(stars),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.get("reviews").push(newReview).write();

    return res.status(201).json({
      message: "리뷰가 등록되었습니다.",
      data: newReview,
    });
  });

  // [PUT] 리뷰 수정 (명세: 부분 업데이트 가능)
  server.put("/courses/:courseId/reviews/:reviewId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { reviewId } = req.params;
    const { title, comment, stars } = req.body;

    const review = db.get("reviews").find({ id: reviewId }).value();

    if (!review) {
      return res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });
    }
    // 본인 리뷰인지 확인 (옵션)
    if (review.userId !== userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    // 변경하지 않을 필드는 null로 전달된다고 가정하거나, undefined일 경우 기존 값 유지
    const updates = {
      updatedAt: new Date().toISOString(),
    };
    if (title) updates.title = title;
    if (comment) updates.comment = comment;
    if (stars) updates.stars = Number(stars);

    db.get("reviews").find({ id: reviewId }).assign(updates).write();

    const updatedReview = db.get("reviews").find({ id: reviewId }).value();

    return res.status(200).json({
      message: "리뷰가 수정되었습니다.",
      data: updatedReview,
    });
  });

  // [DELETE] 리뷰 삭제
  server.delete("/courses/:courseId/reviews/:reviewId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { reviewId } = req.params;

    // 실제로는 userId 체크 필요
    db.get("reviews").remove({ id: reviewId }).write();

    return res.status(200).json({ message: "리뷰가 삭제되었습니다." });
  });

  // ================================================================
  // 2. Q&A Endpoint (레슨 질문)
  // URL: /lessons/{lessonId}/questions
  // ================================================================

  // [GET] 특정 레슨의 질문 목록 조회 (화면 렌더링용 추가)
  server.get("/lessons/:lessonId/questions", (req, res) => {
    const { lessonId } = req.params;

    // 해당 레슨의 질문들
    const questions = db
      .get("questions")
      .filter({ lessonId: Number(lessonId) })
      .value();

    return res.status(200).json(questions);
  });

  // [POST] 질문 등록
  server.post("/lessons/:lessonId/questions", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { lessonId } = req.params;
    const { title, comment, parentId, threadId } = req.body;

    if (!title || !comment) {
      return res.status(400).json({ message: "제목과 내용은 필수입니다." });
    }

    const newQuestion = {
      id: "qna-" + Date.now(),
      userId,
      lessonId: Number(lessonId),
      title,
      comment,
      // 대댓글 기능을 위한 필드들 (없으면 null)
      parentId: parentId || null,
      threadId: threadId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.get("questions").push(newQuestion).write();

    return res.status(201).json({
      message: "질문이 등록되었습니다.",
      data: newQuestion,
    });
  });

  // [PUT] 질문 수정
  server.put("/lessons/:lessonId/questions/:questionId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { questionId } = req.params;
    const updates = req.body; // title, comment 등

    const question = db.get("questions").find({ id: questionId }).value();
    if (!question) {
      return res.status(404).json({ message: "질문을 찾을 수 없습니다." });
    }

    // null 값 처리는 lodash assign이 자동으로 undefined를 무시하지 않으므로,
    // 유효한 값만 골라내는 로직이 필요할 수 있으나 여기선 간단히 merge 합니다.
    db.get("questions")
      .find({ id: questionId })
      .assign({ ...updates, updatedAt: new Date().toISOString() })
      .write();

    return res.status(200).json({ message: "질문이 수정되었습니다." });
  });

  // [DELETE] 질문 삭제
  server.delete("/lessons/:lessonId/questions/:questionId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { questionId } = req.params;

    db.get("questions").remove({ id: questionId }).write();

    return res.status(200).json({ message: "질문이 삭제되었습니다." });
  });

  // ================================================================
  // 3. Support Endpoint (고객센터/문의)
  // URL: /supports
  // ================================================================

  // [GET] 나의 문의 내역 조회 (화면 렌더링용 추가)
  server.get("/supports", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const mySupports = db.get("supports").filter({ userId }).value();

    return res.status(200).json(mySupports);
  });

  // [POST] 문의 등록
  server.post("/supports", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { title, content, type } = req.body; // type: 'billing', 'technical' 등

    const newSupport = {
      id: "support-" + Date.now(),
      userId,
      title,
      content,
      type: type || "GENERAL",
      status: "OPEN", // OPEN, IN_PROGRESS, RESOLVED
      createdAt: new Date().toISOString(),
    };

    db.get("supports").push(newSupport).write();

    return res.status(201).json({
      message: "문의가 접수되었습니다.",
      data: newSupport,
    });
  });

  // [PUT] 문의 수정
  server.put("/supports/:supportId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { supportId } = req.params;
    const updates = req.body;

    const support = db.get("supports").find({ id: supportId }).value();
    if (!support)
      return res.status(404).json({ message: "문의 내역이 없습니다." });

    db.get("supports").find({ id: supportId }).assign(updates).write();

    return res.status(200).json({ message: "문의 내용이 수정되었습니다." });
  });

  // [DELETE] 문의 삭제
  server.delete("/supports/:supportId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { supportId } = req.params;

    db.get("supports").remove({ id: supportId }).write();

    return res.status(200).json({ message: "문의 내역이 삭제되었습니다." });
  });
};

module.exports = registerInteractionRoutes;
