import { http, HttpResponse, delay } from 'msw';
import { RegistResponse, LoginResponse, ReissueResponse } from '@/features/auth/types';

const REQUEST_DELAY = 500;

export const authHandlers = [
  // 로그인 (POST /api/auth/login)
  http.post('**/api/auth/login', async ({ request }) => {
    const { email } = (await request.json()) as any;
    await delay(REQUEST_DELAY);

    // 에러 시나리오
    if (email !== 'grgr@test.com') {
      return HttpResponse.json(
        { message: '아이디/비밀번호가 유효하지 않습니다.', code: 'US-0002' },
        { status: 400 },
      );
    }

    // 성공 시나리오
    const mockLoginData: LoginResponse = {
      userId: 8,
      name: '고로고로',
      email: 'grgr@test.com',
      accessToken: 'mock-access-token',
    };

    return HttpResponse.json(mockLoginData, {
      status: 200,
      headers: {
        'Set-Cookie': 'refresh_token=mock-refresh-token; HttpOnly; Secure; Path=/; Max-Age=3600',
      },
    });
  }),

  // 회원가입 (POST /api/users/register)
  http.post('**/api/users/register', async () => {
    const mockRegistData: RegistResponse = {
      userId: 8,
      email: 'grgr@test.com',
      name: '고로고로',
      role: 'INSTRUCTOR',
    };
    return HttpResponse.json(mockRegistData, { status: 201 });
  }),

  // 토큰 재발급 (POST /api/auth/reissue)
  http.post('**/api/auth/reissue', async () => {
    const mockReissueData: ReissueResponse = {
      accessToken: 'new-mock-access-token',
    };
    return HttpResponse.json(mockReissueData);
  }),
];
