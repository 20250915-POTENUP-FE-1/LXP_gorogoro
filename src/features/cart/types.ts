// 카테고리 상세 정보
export interface CategoryDetail {
  categoryId: number;
  name: string;
  subCategoryDetail: {
    subCategoryId: number;
    name: string;
  };
}

// 장바구니 아이템
export interface CartCourse {
  categoryDetail: CategoryDetail;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  price: number;
  coverImgUrl: string;
  addedAt: string;
}

// 장바구니 요약
export interface Summary {
  totalCount: number;
  totalAmount: number;
}

export interface GetCartResponse {
  owner_id: number;
  items: CartCourse[];
  summary: Summary;
}
