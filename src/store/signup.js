import { auth } from "../firebase/config";
import { addUserProfile, getUserProfile } from "../services/userService";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      // Authentication에 새로운 유저 추가 (EMAIL, UID)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("회원가입 완료");

      // Firestore에 추가할 user 객체 선언
      const newUser = {
        displayName: formData.displayName,
        email: formData.email,
        role: formData.role,
      };

      // Authentication에 추가된 UID
      const uid = userCredential.user.uid;
      // Firestore users collection에 추가
      await addUserProfile(uid, newUser);
      console.log("users 컬렉션에 새 문서 추가 완료");

      // 전역 상태 userProfile에 등록하기 위해 문서 조회 요청
      const userProfile = await getUserProfile(uid);
      // - userProfile 객체를 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { userProfile };
    } catch (error) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "올바른 이메일 형식이 아닙니다.";
          break;
        case "auth/weak-password":
          errorMessage = "비밀번호가 너무 약합니다.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "이미 사용중인 이메일입니다.";
          break;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
