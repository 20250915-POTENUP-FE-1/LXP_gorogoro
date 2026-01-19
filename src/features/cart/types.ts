export interface SubCategoryDetail {
  subCategoryId: number;
  name: string;
}

export interface CategoryDetail {
  categoryId: number;
  name: string;
  subCategoryDetail: SubCategoryDetail;
}

export interface Cart {
  categoryDetail: CategoryDetail;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  price: number;
  coverImgUrl: string;
  addedAt: string;
}

export interface CartSummary {
  totalCount: number;
  totalAmount: number;
}

export interface CartResponse {
  owner_id: number;
  items: Cart[];
  summary: CartSummary;
}

export interface Summary {
  totalCount: number;
  totalAmount: number;
}

export interface CartRequest {
  courseId: number;
}
