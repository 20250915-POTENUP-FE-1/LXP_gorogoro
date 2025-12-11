export interface CartCourse {
  categoryName: string;
  subCategoryName: string;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  price: number;
  coverImgUrl: string;
  addedAt: string;
}
export interface Summary {
  totalCount: number;
  totalAmount: number;
}
export interface Cart {
  cart_id: number;
  items: CartCourse[];
  summary: Summary;
}
