/**
 * db, getDoc, setDoc, doc
 * 1. 회원가입(auth) 후 firestore database의 users 컬렉션에 문서 추가
 * 2. 사용자 프로필 조회 auth.currentUser.uid를 통해 firestore users컬렉션의 문서 찾고 반환
 */

import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const USERS_COLLECTION_NAME = "users";

/**
 * @description 회원가입 후 사용자 프로필 db에 등록
 * @param {string} uid - Authentication에 사용자 등록시 발급된 uid
 * @param {object} newUser - 사용자 입력 정보 {displayName, role, email}
 */
const addUserProfile = async (uid, newUser) => {
  const docRef = doc(db, USERS_COLLECTION_NAME, uid);
  await setDoc(docRef, newUser);
};

/**
 * @description auth.currentUser.uid를 통해 사용자 프로필
 * @param {string} uid - onAuthStateChanged에서 받아온 auth.currentUser.uid
 */
const getUserProfile = async (uid) => {
  const docRef = doc(db, USERS_COLLECTION_NAME, uid);
  const userDocRef = await getDoc(docRef);
  return {
    id: userDocRef.id,
    ...userDocRef.data(),
  };
};

export { addUserProfile, getUserProfile };
