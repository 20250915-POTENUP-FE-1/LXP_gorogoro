import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserProfile } from "../services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userId = userCredential.user.uid;
      const userProfile = await getUserProfile(userId);

      return { userProfile };
    } catch (error) {
      let errorMessage = "로그인 중 오류가 발생했습니다.";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "등록되지 않은 이메일입니다.";
          break;
        case "auth/wrong-password":
          errorMessage = "비밀번호가 올바르지 않습니다.";
          break;
        default:
          errorMessage = "로그인에 실패했습니다.";
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export { login };
