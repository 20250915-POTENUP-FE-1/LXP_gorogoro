import { collection, doc, getDoc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config.js";
//강의 및 카테고리 정보 CRUD 관련 서비스
//카테고리 목록 조회 getCategories()
//전체 강의 조회 getCourses()
//강의 상세 조회 getCourseById()
const COURSES_COLLECTION_NAME = "courses";
/**
 * @param {string} courseId - 조회할 게시글 고유ID
 * @return {null|Object} 특정 게시글 객체(고유ID포함) 또는 null
 */
export const getCourseById = async (courseId) => {
  try {
    const docSnapshot = await getDoc(
      doc(db, COURSES_COLLECTION_NAME, courseId)
    );
    if (!docSnapshot.exists()) {
      return null;
    }
    const docSnapshotData = docSnapshot.data();
    return {
      id: docSnapshot.id,
      ...docSnapshotData,
    };
  } catch (error) {
    throw error;
  }
};

//강의 등록 createCourse()
//강의 수정 updateCourse()
//강의 삭제 deleteCourse()
