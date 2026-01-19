import { GetMeResponse, UpdateUserRequest, UpdateUserResponse } from '@/features/auth/types';
import { fetchWithAuth } from '@/shared/lib/authApi';

const GET_ME_ENDPOINT = 'users/info';
const UPDATE_ME_ENDPOINT = 'users/update';

/**
 * 내 정보 조회
 * GET /api/users/info
 * @throws {BackendError}
 */
export const getMe = async (): Promise<GetMeResponse> => {
  return await fetchWithAuth<GetMeResponse>(GET_ME_ENDPOINT, {
    method: 'GET',
  });
};

/**
 * 내 정보 수정
 * PATCH /api/users/update
 * @throws {BackendError}
 */
export const updateMe = async (body: UpdateUserRequest): Promise<void> => {
  await fetchWithAuth<UpdateUserResponse>(UPDATE_ME_ENDPOINT, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
