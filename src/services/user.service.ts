import {
  GetMeResponse,
  ModifyMeRequest,
  ModifyMeResponse,
} from "@/features/auth/types";
import { fetchWithAuth } from "@/shared/lib/serverApi";

const GET_ME_ENDPOINT = "auth/v1/users/me";
const MODIFY_ME_ENDPOINT = "auth/users/modify";

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await fetchWithAuth(`${GET_ME_ENDPOINT}`, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data;
};

export const modifyMe = async (
  body: ModifyMeRequest
): Promise<ModifyMeResponse> => {
  const response = await fetchWithAuth(`${MODIFY_ME_ENDPOINT}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (response.error) throw response.error;
  return response.data;
};
