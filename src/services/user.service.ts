import {
  GetMeResponse,
  ModifyMeRequest,
  ModifyMeResponse,
} from "@/features/auth/types";
import { fetchWithAuth } from "@/shared/lib/authApi";

const GET_ME_ENDPOINT = "users/info";
const MODIFY_ME_ENDPOINT = "users/modify";

/**
 * 내 정보 조회
 * @throws {BackendError}
 */
export const getMe = async (): Promise<GetMeResponse> => {
  return await fetchWithAuth(`${GET_ME_ENDPOINT}`, {
    method: "GET",
  });
};

/**
 * 내 정보 수정
 * @throws {BackendError}
 */
export const modifyMe = async (
  body: ModifyMeRequest
): Promise<ModifyMeResponse> => {
  return await fetchWithAuth(`${MODIFY_ME_ENDPOINT}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
