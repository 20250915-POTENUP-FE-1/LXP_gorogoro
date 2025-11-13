import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
    } catch (error) {
      let errorMessage = "로그아웃에 실패했습니다.";
      switch (error.code) {
        case "auth/network-request-failed":
          errorMessage = "네트워크 연결에 실패했습니다. 다시 시도해주세요.";
          break;
        case "auth/internal-error":
          errorMessage = "서버 내부 오류가 발생했습니다. 다시 시도해주세요.";
          break;
        case "auth/invalid-credential":
          errorMessage = "유효하지 않은 인증 정보입니다. 다시 로그인해주세요.";
          break;
        default:
          errorMessage = "로그아웃에 실패했습니다.";
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export { logout };
