import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config.js";
import { doc, setDoc } from "firebase/firestore";

//회원가입(사용자 정보 등록:authentication엔 uid,email 만 등록 가능)
export const signUp = async ({ email, password, displayName, role }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userID = user.uid;
    console.log("회원가입 성공:", user.uid);
    await setDoc(doc(db, "users", userID), {
      displayName,
      email,
      role,
    });
    return user;
  } catch (error) {
    console.log("회원가입 실패:", error);
    throw error;
  }
};
//로그인(사용자 정보 조회)
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("로그인 성공:", user.uid);
    return user;
  } catch (error) {
    console.log("로그인중 에러발생", error);
    console.log("에러코드", error.code);
    console.log("에러메세지", error.message);
    // if (error.code === "auth/invalid-credential") {
    //   console.log("존재하지 않는 계정입니다");
    // }
    throw error;
  }
};

// logIn("yoonsun@naver.com", "tina1234");

//로그아웃(현재 로그인된 사용자 로그아웃)
export const logOut = async () => {
  //현재 로그인된 사용자(브라우저상에 저장) 정보 가져오기=>auth 객체의 currentUser에 저장
  console.log("현재 로그인된 사용자 UID:", auth.currentUser.uid);
  console.log("현재 로그인된 사용자 email:", auth.currentUser.email);
  //로그아웃
  await signOut(auth);
  console.log("로그아웃 성공");
  console.log("현재 로그인 되어있는 사용자:", auth.currentUser);
};

//인증상태 변경감지
export const checkAuthState = () => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("*****Auth 상태 변경됨****** ");
    if (currentUser) {
      //로그인 됨(인증된 사용자 있음)
      console.log("현재 로그인된 사용자:", currentUser.uid);
    } else {
      //로그아웃 됨(인증 정보 사라짐)
      console.log("로그인된 사용자가 없습니다.");
    }
  });
};
// checkAuthState();
// await logIn("yoonsun@naver.com", "tina1234");
// await logOut();
