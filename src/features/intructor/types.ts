type Lesson = {
  title: string;
  seq?: number;
  resourceUrl: string;
};

type Chapter = {
  chapterTitle: string;
  seq?: number;
  lessons: Lesson[];
};

export interface CourseFormData {
  title: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: string;
  price: number;
  thumbnailUrl: string;
  summary: string;
  description: string;
  contents: Chapter[];
}
