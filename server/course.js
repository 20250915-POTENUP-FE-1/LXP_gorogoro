const registerCourseRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Helper: 인증 체크 (강사/관리자 권한 체크용으로 확장 가능)
  // ==========================================
  const checkAuth = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return null;
    }
    // 코스 생성/수정은 강사(instructor) 권한이 필요할 수 있으나,
    // Mock에서는 일단 유저가 존재하면 통과시킵니다.
    return "user-1";
  };

  // ==========================================
  // Course: 강의 생성 (POST /api/v1/courses)
  // ==========================================
  server.post("/api/v1/courses", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const {
      title,
      summary,
      categoryId,
      price,
      coverImageUrl,
      description,
      level,
      contents,
      availableDays,
    } = req.body;

    // 필수값 유효성 검사 (필요에 따라 추가)
    if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "제목과 커리큘럼(contents)은 필수입니다." });
    }

    const newCourse = {
      id: Date.now(), // Number ID
      instructorId: userId, // 생성한 사람
      title,
      summary: summary || "",
      categoryId: categoryId || 1, // Default category
      price: price || 0,
      coverImageUrl: coverImageUrl || "https://via.placeholder.com/600x400",
      description: description || "",
      // 명세서 코멘트 반영: ENUM 처럼 관리 (BEGINNER, INTERMEDIATE, ADVANCED)
      level: level || "BEGINNER",
      contents: contents || [], // 챕터와 레슨 구조
      availableDays: availableDays || 9999, // 평생 소장 기본값
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.get("courses").push(newCourse).write();

    return res.status(201).json({
      message: "강의가 성공적으로 생성되었습니다.",
      course: newCourse,
    });
  });

  // ==========================================
  // Course: 강의 목록 조회 (GET /api/v1/courses)
  // ==========================================
  server.get("/api/v1/courses", (req, res) => {
    // 필터링 기능 지원 (예: ?categoryId=1)
    const { categoryId } = req.query;

    let courses = db.get("courses").value();

    if (categoryId) {
      courses = courses.filter((c) => c.categoryId == categoryId);
    }

    // 리스트 조회 시에는 contents 같은 무거운 데이터는 제외하고 내려주는 것이 성능상 좋습니다.
    // (여기서는 Mock이라 그냥 다 내려줍니다)
    return res.status(200).json(courses);
  });

  // ==========================================
  // Course: 강의 상세 조회 (GET /api/v1/courses/:courseId)
  // ==========================================
  server.get("/api/v1/courses/:courseId", (req, res) => {
    const { courseId } = req.params;

    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    if (!course) {
      return res.status(404).json({ message: "강의를 찾을 수 없습니다." });
    }

    return res.status(200).json(course);
  });

  // ==========================================
  // Course: 강의 수정 (PATCH /api/v1/courses/:courseId)
  // ==========================================
  server.patch("/api/v1/courses/:courseId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { courseId } = req.params;
    const updates = req.body; // 수정할 필드들

    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    if (!course) {
      return res
        .status(404)
        .json({ message: "수정할 강의를 찾을 수 없습니다." });
    }

    // (옵션) 본인이 만든 강의인지 체크하는 로직이 들어갈 자리
    // if (course.instructorId !== userId) return res.status(403)...

    // 업데이트 수행
    db.get("courses")
      .find({ id: Number(courseId) })
      .assign({
        ...updates,
        updatedAt: new Date().toISOString(), // 수정 시간 갱신
      })
      .write();

    const updatedCourse = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    return res.status(200).json({
      message: "강의 정보가 수정되었습니다.",
      course: updatedCourse,
    });
  });

  // ==========================================
  // Course: 강의 삭제 (DELETE /api/v1/courses/:courseId)
  // ==========================================
  server.delete("/api/v1/courses/:courseId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { courseId } = req.params;

    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    if (!course) {
      return res
        .status(404)
        .json({ message: "삭제할 강의가 존재하지 않습니다." });
    }

    db.get("courses")
      .remove({ id: Number(courseId) })
      .write();

    return res.status(200).json({ message: "강의가 삭제되었습니다." });
  });
};

module.exports = registerCourseRoutes;
