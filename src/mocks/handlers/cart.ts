import { http, HttpResponse, delay } from 'msw';
import { CartResponse, CartRequest, Cart } from '@/features/cart/types';

const REQUEST_DELAY = 300;

let mockCartItems: Cart[] = [
  {
    courseId: 101,
    courseTitle: 'Next.js 15 완벽 가이드',
    instructorName: 'Gemini 시니어',
    price: 55000,
    coverImgUrl: 'https://picsum.photos/seed/next/200/300',
    addedAt: new Date().toISOString(),
    categoryDetail: {
      categoryId: 1,
      name: '개발·프로그래밍',
      subCategoryDetail: {
        subCategoryId: 7,
        name: '프론트엔드',
      },
    },
  },
  {
    courseId: 102,
    courseTitle: '데이터 분석 입문',
    instructorName: '데이터 마스터',
    price: 48000,
    coverImgUrl: 'https://picsum.photos/seed/data/200/300',
    addedAt: new Date().toISOString(),
    categoryDetail: {
      categoryId: 2,
      name: '데이터사이언스',
      subCategoryDetail: {
        subCategoryId: 11,
        name: '데이터 분석',
      },
    },
  },
];

export const cartHandlers = [
  // 장바구니 조회 (GET /api/carts)
  http.get('**/api/carts', async () => {
    await delay(REQUEST_DELAY);

    const totalAmount = mockCartItems.reduce((sum, item) => sum + item.price, 0);

    const response: CartResponse = {
      owner_id: 8,
      items: mockCartItems,
      summary: {
        totalCount: mockCartItems.length,
        totalAmount: totalAmount,
      },
    };

    return HttpResponse.json(response);
  }),

  // 장바구니 추가 (POST /api/carts)
  http.post('**/api/carts', async ({ request }) => {
    const { courseId } = (await request.json()) as CartRequest;
    await delay(REQUEST_DELAY);

    // 실제로는 여기에 새 아이템을 push해서 조회가 바뀌는걸 테스트할 수 있어
    return new HttpResponse(null, { status: 201 });
  }),

  // 장바구니 전체 삭제 (DELETE /api/carts)
  http.delete('**/api/carts', async () => {
    await delay(REQUEST_DELAY);
    mockCartItems = [];
    return new HttpResponse(null, { status: 204 });
  }),

  // 장바구니 선택 삭제 (DELETE /api/carts/items)
  http.delete('**/api/carts/items', async ({ request }) => {
    const { courseId } = (await request.json()) as CartRequest;
    await delay(REQUEST_DELAY);

    mockCartItems = mockCartItems.filter((item) => item.courseId !== courseId);
    return new HttpResponse(null, { status: 204 });
  }),
];
