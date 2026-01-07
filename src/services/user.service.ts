import { GetMeResponse, ModifyMeRequest } from '@/features/auth/types';
import { fetchWithAuth } from '@/shared/lib/authApi';

const GET_ME_ENDPOINT = 'users/info';
const MODIFY_ME_ENDPOINT = 'users/modify';

/**
 * 내 정보 조회
 * GET /api/users/info
 * @throws {BackendError}
 */
export const getMe = async (): Promise<GetMeResponse> => {
  return await fetchWithAuth(`${GET_ME_ENDPOINT}`, {
    method: 'GET',
  });
};

/**
 * 내 정보 수정
 * PATCH /api/users/modify
 * @throws {BackendError}
 */
export const modifyMe = async (body: ModifyMeRequest): Promise<void> => {
  return await fetchWithAuth(`${MODIFY_ME_ENDPOINT}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
