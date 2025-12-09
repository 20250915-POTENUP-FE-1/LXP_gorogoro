const registerCategoryRoutes = (server, router) => {
  const db = router.db;
  const API_PREFIX = "/api/v1"; // 기존 파일들과 일관성 유지

  // ==========================================
  // Category: 계층형 카테고리 목록 조회 (GET /api/v1/categories)
  // ==========================================
  server.get(`${API_PREFIX}/categories`, (req, res) => {
    // 1. 모든 카테고리 데이터를 가져옵니다.
    const allCategories = db.get("categories").value();

    if (!allCategories || allCategories.length === 0) {
      // 데이터가 없는 경우를 대비
      return res.status(200).json([]);
    }

    // 2. 1차 카테고리 (parentId가 null인 항목)를 필터링합니다.
    const primaryCategories = allCategories.filter((c) => c.parentId === null);

    // 3. 1차 카테고리에 2차 카테고리를 중첩하여 계층 구조를 만듭니다.
    const hierarchicalCategories = primaryCategories.map((parent) => {
      // 해당 1차 카테고리의 ID를 parentId로 가지는 모든 2차 카테고리
      const subCategories = allCategories
        .filter((c) => c.parentId === parent.id)
        .map((child) => ({
          id: child.id,
          name: child.name,
          slug: child.slug, // URL 라우팅용 slug를 포함 (옵션)
          // 3차 이상의 깊이가 필요하면 여기에 재귀 호출을 넣을 수 있습니다.
        }));

      // 프론트엔드에서 사용하기 편하도록 nested 구조로 반환
      return {
        id: parent.id,
        name: parent.name,
        slug: parent.slug,
        subCategories: subCategories,
      };
    });

    return res.status(200).json(hierarchicalCategories);
  });
};

module.exports = registerCategoryRoutes;
