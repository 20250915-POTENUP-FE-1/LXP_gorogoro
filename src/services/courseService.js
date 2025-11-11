import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

const COURSES_COLLECTION_NAME = "courses";
const CATEGORIES_COLLECTION_NAME = "categories";

//카테고리 목록 조회 getCategories()
const getCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION_NAME));
  return snapshot.docs.map((doc) => doc.data());
};

//필터링 강의 조회 getFilteredCourses()
const getFilteredCourses = async (filters) => {
  const { category, searchTerm, sort } = filters;

  try {
    //컬렉션 지정
    const colRef = collection(db, COURSES_COLLECTION_NAME);
    let q = query(colRef);

    // query() 함수에 기존 쿼리 객체(q)와 새로운 제약 조건(where(...))을
    // 함께 전달하면, 기존 쿼리와 새 제약 조건이 모두 적용된
    // 완전히 새로운 쿼리 객체를 만들어 반환

    // category 카테고리 필터링
    if (category && category !== "all") {
      q = query(q, where("category", "==", category));
    }

    // sort 정렬 옵션
    if (sort === "latest") {
      q = query(q, orderBy("createdAt", "desc"));
    } else if (sort === "priceAsc") {
      q = query(q, orderBy("price", "asc"));
    } else if (sort === "priceDesc") {
      q = query(q, orderBy("price", "desc"));
    }

    // 쿼리 실행(비동기:데이터 가져오기)
    const querySnapshot = await getDocs(q);
    // 데이터 가공
    let courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 검색어 필터링
    if (searchTerm) {
      courses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return courses;
  } catch (error) {
    throw error;
  }
};

//강의 상세 조회 getCourseById()
/**
 * @param {string} courseId - 조회할 게시글 고유ID
 * @return {null|Object} 특정 게시글 객체(고유ID포함) 또는 null
 */
const getCourseById = async (courseId) => {
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
/**
 * @param {Object} formData - 등록할 게시물 객체
 */
const createCourse = async (formData) => {
  try {
    const docRef = await addDoc(
      collection(db, COURSES_COLLECTION_NAME),
      formData
    );
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

//강의 수정 updateCourse()
//강의 삭제 deleteCourse()

export { getCategories, getFilteredCourses, getCourseById, createCourse };
