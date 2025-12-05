export interface Course {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: string;
  price: number;
  status: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt?: string;
}
export interface Category {
  id: string;
  name: string;
}
