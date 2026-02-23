import { http, HttpResponse } from 'msw';
import { GetMeResponse, UpdateUserResponse } from '@/features/auth/types';

export const userHandlers = [
  // 내 정보 조회 (GET /api/users/info)
  http.get('**/api/users/info', () => {
    const mockUserData: GetMeResponse = {
      userId: 8,
      email: 'grgr@test.com',
      name: '고로고로',
      role: 'INSTRUCTOR',
    };
    return HttpResponse.json(mockUserData);
  }),

  // 정보 수정 (PUT/PATCH /api/users/update - 예시 엔드포인트)
  http.patch('**/api/users/update', async ({ request }) => {
    const mockUpdateData: UpdateUserResponse = {
      userId: 8,
      email: 'grgr@test.com',
      name: '업데이트고로고로',
      role: 'INSTRUCTOR',
    };
    return HttpResponse.json(mockUpdateData);
  }),
];
