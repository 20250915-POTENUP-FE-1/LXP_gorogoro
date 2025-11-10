//강의 및 카테고리 정보 CRUD 관련 서비스
//카테고리 목록 조회 getCategories()
//전체 강의 조회 getCourses()
//강의 상세 조회 getCourseById()
//강의 등록 createCourse()
//강의 수정 updateCourse()
//강의 삭제 deleteCourse()

import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config.js";

const COURSES_COLLECTION_NAME = "courses";
const CATEGORIES_COLLECTION_NAME = "categories";

const getCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION_NAME));
  return snapshot.docs.map((doc) => doc.data());
};

const getCourses = async () => {
  try {
    //컬렉션 지정
    const colRef = collection(db, COURSES_COLLECTION_NAME);
    //쿼리 생성
    const q = query(colRef, orderBy("createdAt", "desc"));
    //쿼리 실행(비동기:데이터 가져오기)
    const querySnapshot = await getDocs(q);
    //데이터 가공
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return courses;
  } catch (error) {
    console.log("오류가 발생했습니다.");
    throw error;
  }
};

export { getCategories, getCourses };
