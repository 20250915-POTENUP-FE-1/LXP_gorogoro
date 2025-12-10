import { ModifyMeRequest, ModifyMeResponse } from "@/features/auth/types";
import { fetchWithAuth } from "@/shared/lib/api";

const GET_ME_ENDPOINT = "auth/users/get";
const MODIFY_ME_ENDPOINT = "auth/users/modify";

export const getMe = async () => {
  const res = await fetchWithAuth(`${GET_ME_ENDPOINT}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`회원정보 가져오기 실패:${res.status}`);
  return res.json();
};

export const modifyMe = async (
  body: ModifyMeRequest
): Promise<ModifyMeResponse> => {
  const res = await fetchWithAuth(`${MODIFY_ME_ENDPOINT}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`회원정보 수정하기 실패:${res.status}`);
  return res.json();
};
