import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./signup";
import { login } from "./login";
import { logout } from "./logout";

const initialState = {
  userProfile: null, // Firebase Firestore의 사용자 프로필 객체
  loading: false, // 인증 상태 변경시 로딩 상태 표시
  error: "", // 인증 상태 변경시 발생된 에러 메시지
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 에러 메시지 초기화 액션
    clearError: (state) => {
      state.error = "";
    },
    // onAuthChange로 currentUser.uid를 통해 users 컬렉션에서 조회한 문서를 상태로 설정
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  // extraReducers : 비동기 액션 처리
  extraReducers: (builder) => {
    // builder 패턴을 이용한 액션 타입 처리
    // 1) login 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      //  - 로그인 요청 시작 (pending 상태)
      .addCase(login.pending, (state) => {
        state.loading = true; // 로딩중 상태 활성화
        state.error = ""; // 이전 에러 메시지 초기화
      })
      //   - 로그인 요청 성공 (fulfilled 상태) : action.payload에는 createAsyncThunk() 함수에서 반환된 데이터가 담겨있음
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.userProfile;
      })
      //   - 로그인 요청 실패 (rejected 상태) : action.payload에는 rejectWithValue() 함수로 전달된 메세지가 담겨있음
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // // 2) logout 비동기 액션 처리  (fulfilled 만 진행)
    builder
      .addCase(logout.fulfilled, (state) => {
        state.userProfile = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
    // 3) signup 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      //  - 회원가입 요청 시작 (pending 상태)
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //  - 회원가입 요청 성공 (fulfilled 상태)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.userProfile;
      })
      //  - 회원가입 요청 실패 (rejected 상태)
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// clearError, setUserProfile 액션 export
export const { clearError, setUserProfile } = authSlice.actions;

export default authSlice.reducer;
