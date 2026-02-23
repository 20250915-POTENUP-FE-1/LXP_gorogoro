import { http, HttpResponse } from 'msw';
import { CategoriesResponse, Category } from '@/features/courses/types';

const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: '개발·프로그래밍',
    subCategories: [
      { id: 6, name: '알고리즘', parentId: 1 },
      { id: 7, name: '프론트엔드', parentId: 1 },
      { id: 8, name: '백엔드', parentId: 1 },
      { id: 9, name: '데이터베이스', parentId: 1 },
      { id: 10, name: '데브옵스', parentId: 1 },
    ],
  },
  {
    id: 2,
    name: '데이터사이언스',
    subCategories: [
      { id: 11, name: '데이터 분석', parentId: 2 },
      { id: 12, name: '데이터 엔지니어링', parentId: 2 },
    ],
  },
  {
    id: 3,
    name: '디자인·아트',
    subCategories: [
      { id: 13, name: 'UI/UX', parentId: 3 },
      { id: 14, name: '그래픽 디자인', parentId: 3 },
      { id: 15, name: '3D·모션', parentId: 3 },
      { id: 16, name: '웹툰', parentId: 3 },
    ],
  },
  {
    id: 4,
    name: 'AI 기술',
    subCategories: [
      { id: 17, name: '생성형 AI', parentId: 4 },
      { id: 18, name: '자연어 처리', parentId: 4 },
    ],
  },
  {
    id: 5,
    name: '게임 개발',
    subCategories: [
      { id: 19, name: '프로그래밍', parentId: 5 },
      { id: 20, name: '아트·그래픽', parentId: 5 },
    ],
  },
];

export const categoryHandlers = [
  http.get('**/api/categories', () => {
    const response: CategoriesResponse = {
      contents: MOCK_CATEGORIES,
    };

    return HttpResponse.json(response);
  }),
];
