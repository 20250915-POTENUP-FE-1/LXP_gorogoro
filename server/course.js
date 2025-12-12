const registerCourseRoutes = (server, router) => {
  const db = router.db;

  // ==========================================
  // Helper: 인증 체크
  // ==========================================
  const checkAuth = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        message: "인증이 필요합니다.",
        code: "AUTH-001",
      });
      return null;
    }
    // Mock에서는 토큰이 있으면 통과
    return "user-1";
  };

  // ==========================================
  // Helper: Validation Error 생성
  // ==========================================
  const createValidationError = (errors) => {
    return {
      message: "입력값이 올바르지 않습니다.",
      code: "VALIDATION_ERROR",
      errors: errors,
    };
  };

  // ==========================================
  // Course: 강좌 생성 (POST /api/v1/courses)
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
      courseDifficulty,
      contents,
      availableDays,
    } = req.body;

    // Validation 체크
    const validationErrors = [];

    if (!title) {
      validationErrors.push({
        field: "title",
        reason: "강좌 제목을 작성해주세요.",
      });
    } else if (title.length > 30) {
      validationErrors.push({
        field: "title",
        reason: "강좌 제목은 30자까지만 가능합니다.",
      });
    }

    if (!summary) {
      validationErrors.push({
        field: "summary",
        reason: "강좌 소개를 작성해주세요.",
      });
    } else if (summary.length > 200) {
      validationErrors.push({
        field: "summary",
        reason: "강좌 소개는 200자까지만 가능합니다.",
      });
    }

    if (!description) {
      validationErrors.push({
        field: "description",
        reason: "강좌 설명을 작성해주세요.",
      });
    } else if (description.length > 1000) {
      validationErrors.push({
        field: "description",
        reason: "강좌 설명은 1000자까지만 가능합니다.",
      });
    }

    if (!categoryId) {
      validationErrors.push({
        field: "categoryId",
        reason: "카테고리를 선택해주세요.",
      });
    }

    if (price === undefined || price === null) {
      validationErrors.push({ field: "price", reason: "금액을 입력해주세요." });
    } else if (price < 0) {
      validationErrors.push({
        field: "price",
        reason: "금액은 0이상 설정해주세요.",
      });
    }

    if (!coverImageUrl) {
      validationErrors.push({
        field: "coverImageUrl",
        reason: "커버 이미지를 업로드해주세요.",
      });
    }

    if (!courseDifficulty) {
      validationErrors.push({
        field: "courseDifficulty",
        reason: "강좌의 난이도를 선택해주세요",
      });
    }

    if (availableDays === undefined || availableDays === null) {
      validationErrors.push({
        field: "availableDays",
        reason: "이용가능한 날을 선택해주세요",
      });
    } else if (availableDays < 0) {
      validationErrors.push({
        field: "availableDays",
        reason: "이용 가능한 날은 0이상 설정해주세요.",
      });
    }

    if (validationErrors.length > 0) {
      return res.status(400).json(createValidationError(validationErrors));
    }

    // 중복 시퀀스 체크 (임의로 시뮬레이션)
    // 실제로는 contents 배열에서 seq가 중복되는지 검사
    if (contents && contents.length > 0) {
      const seqs = contents.map((c) => c.seq);
      if (new Set(seqs).size !== seqs.length) {
        return res.status(400).json({
          message: "중복된 시퀀스가 존재합니다.",
          code: "COS-0011",
        });
      }
    }

    const newCourse = {
      id: Date.now(),
      instructorId: userId,
      title,
      summary,
      categoryId,
      price,
      coverImageUrl,
      description,
      difficulty: courseDifficulty,
      contents: contents || [],
      availableDays,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.get("courses").push(newCourse).write();

    // 201 Created - 응답 본문 없음 (swagger 명세)
    return res.status(201).send();
  });

  // ==========================================
  // Course: 강좌 목록 조회 (GET /api/v1/courses)
  // ==========================================
  server.get("/api/v1/courses", (req, res) => {
    const { categoryId, search, sort } = req.query;

    let courses = db.get("courses").value();

    // 카테고리 필터링
    if (categoryId) {
      const category = db
        .get("categories")
        .find({ id: Number(categoryId) })
        .value();

      if (category) {
        if (category.parentId === null) {
          const subCategoryIds = db
            .get("categories")
            .filter((c) => c.parentId === category.id)
            .map((c) => c.id)
            .value();
          courses = courses.filter((c) =>
            subCategoryIds.includes(c.categoryId)
          );
        } else {
          courses = courses.filter((c) => c.categoryId == categoryId);
        }
      }
    }

    // 검색 필터링
    if (search) {
      const searchLower = search.toLowerCase();
      courses = courses.filter((course) => {
        return (
          course.title?.toLowerCase().includes(searchLower) ||
          course.summary?.toLowerCase().includes(searchLower) ||
          course.description?.toLowerCase().includes(searchLower)
        );
      });
    }

    // 정렬
    if (sort === "latest") {
      courses = courses.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    } else if (sort === "priceAsc") {
      courses = courses.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "priceDesc") {
      courses = courses.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    // CourseSummaryResponse 형식으로 반환
    const contents = courses.map((course) => ({
      courseId: course.id,
      title: course.title,
      price: course.price,
      name: "강사명", // Mock 데이터
      coverImageUrl: course.coverImageUrl,
    }));

    return res.status(200).json({ contents });
  });

  // ==========================================
  // Course: 강좌 상세 조회 (GET /api/v1/courses/:courseId)
  // ==========================================
  server.get("/api/v1/courses/:courseId", (req, res) => {
    const { courseId } = req.params;

    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    if (!course) {
      return res.status(404).json({
        message: "강좌를 찾을 수 없습니다.",
        code: "COS-0012",
      });
    }

    // CourseDetailResponse 형식으로 반환
    const response = {
      courseId: course.id,
      title: course.title,
      summary: course.summary,
      description: course.description,
      price: course.price,
      accessDays: course.availableDays,
      categoryDetail: {
        categoryId: course.categoryId,
        name: "카테고리명",
        subCategoryDetailDto: {
          subCategoryId: course.categoryId,
          name: "하위카테고리명",
        },
      },
      instructorName: "강사명",
      instructorId: course.instructorId,
      coverImageUrl: course.coverImageUrl,
      difficulty: course.difficulty,
      chapters: course.contents || [],
    };

    return res.status(200).json(response);
  });

  // ==========================================
  // Course: 강좌 수정 (PUT /api/v1/courses/:courseId)
  // ==========================================
  server.put("/api/v1/courses/:courseId", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { courseId } = req.params;
    const updates = req.body;

    const course = db
      .get("courses")
      .find({ id: Number(courseId) })
      .value();

    if (!course) {
      return res.status(404).json({
        message: "강좌를 찾을 수 없습니다.",
        code: "COS-0012",
      });
    }

    // 권한 체크 (강좌 소유자가 아닌 경우)
    if (course.instructorId !== userId) {
      return res.status(403).json({
        message: "해당 유저는 강의의 소유자가 아닙니다.",
        code: "COS-0013",
      });
    }

    // Validation 체크
    const validationErrors = [];

    if (updates.title && updates.title.length > 30) {
      validationErrors.push({
        field: "title",
        reason: "강좌 제목은 30자까지만 가능합니다.",
      });
    }

    if (updates.summary && updates.summary.length > 200) {
      validationErrors.push({
        field: "summary",
        reason: "강좌 소개는 200자까지만 가능합니다.",
      });
    }

    if (updates.description && updates.description.length > 1000) {
      validationErrors.push({
        field: "description",
        reason: "강좌 설명은 1000자까지만 가능합니다.",
      });
    }

    if (updates.price !== undefined && updates.price < 0) {
      validationErrors.push({
        field: "price",
        reason: "금액은 0보다 크게 작성해주세요.",
      });
    }

    if (updates.availableDays !== undefined && updates.availableDays < 0) {
      validationErrors.push({
        field: "availableDays",
        reason: "이용 가능한 날은 0이상 설정해주세요.",
      });
    }

    if (validationErrors.length > 0) {
      return res.status(400).json(createValidationError(validationErrors));
    }

    // 중복 시퀀스 체크
    if (updates.contents && updates.contents.length > 0) {
      const seqs = updates.contents.map((c) => c.seq);
      if (new Set(seqs).size !== seqs.length) {
        return res.status(400).json({
          message: "중복된 시퀀스가 존재합니다.",
          code: "COS-0011",
        });
      }
    }

    // 업데이트 수행
    db.get("courses")
      .find({ id: Number(courseId) })
      .assign({
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .write();

    // 204 No Content - 응답 본문 없음
    return res.status(204).send();
  });

  // ==========================================
  // Course: 강좌 삭제 (DELETE /api/v1/courses/:courseId)
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
      return res.status(404).json({
        message: "강좌를 찾을 수 없습니다.",
        code: "COS-0012",
      });
    }

    // 권한 체크
    if (course.instructorId !== userId) {
      return res.status(403).json({
        message: "해당 유저는 강의의 소유자가 아닙니다.",
        code: "COS-0013",
      });
    }

    db.get("courses")
      .remove({ id: Number(courseId) })
      .write();

    // 204 No Content
    return res.status(204).send();
  });

  // ==========================================
  // Instructor: 강사 본인 강좌 요약 조회 (GET /api/instructor/courses)
  // ==========================================
  server.get("/api/instructor/courses", (req, res) => {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const courses = db.get("courses").filter({ instructorId: userId }).value();

    const contents = courses.map((course) => ({
      courseId: course.id,
      title: course.title,
      coverImageUrl: course.coverImageUrl,
      price: course.price,
      difficulty: course.difficulty,
    }));

    return res.status(200).json({ contents });
  });
};

module.exports = registerCourseRoutes;
