import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

const COURSES_COLLECTION_NAME = "courses";
const CATEGORIES_COLLECTION_NAME = "categories";

//카테고리 목록 조회 getCategories()
const getCategories = async () => {
  const colRef = collection(db, CATEGORIES_COLLECTION_NAME);
  const snapshot = await getDocs(colRef);
  const snapshotData = snapshot.docs.map((doc) => doc.data());
  return snapshotData;
};

//필터링 강의 조회 getFilteredCourses()
const getFilteredCourses = async (filters) => {
  const { category, searchTerm, sort } = filters;

  try {
    //컬렉션 지정
    const colRef = collection(db, COURSES_COLLECTION_NAME);
    // status가 "active"인 강좌만 필터링
    let q = query(colRef, where("status", "==", "published"));

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
    // 데이터 가공 (타임스탬프 변환 포함)
    let courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
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
    const docRef = doc(db, COURSES_COLLECTION_NAME, courseId);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      return null;
    }
    const courseData = docSnapshot.data();
    // Firestore Timestamp를 JavaScript Date 객체로 변환
    if (courseData.createdAt && courseData.createdAt.toDate) {
      courseData.createdAt = courseData.createdAt.toDate();
    }
    if (courseData.updatedAt && courseData.updatedAt.toDate) {
      courseData.updatedAt = courseData.updatedAt.toDate();
    }
    return {
      id: docSnapshot.id,
      ...courseData,
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
    const docRef = await addDoc(collection(db, COURSES_COLLECTION_NAME), {
      ...formData,
      status: "published",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

/**
 * @description 수강 신청 또는 장바구니에 담긴 내역을 확인하여 안전하게 강좌를 삭제(소프트/하드)합니다.
 * @param {string} courseId - 삭제할 강좌의 고유 ID
 */
const deleteCourseSafely = async (courseId) => {
  try {
    // 1. 수강 신청(enrollments) 확인
    const enrollColRef = collection(db, "enrollments");
    const qEnroll = query(enrollColRef, where("courseId", "==", courseId));
    const qEnrollSnapshot = await getDocs(qEnroll);

    // 2. 장바구니(carts) 확인
    const cartsColRef = collection(db, "carts");
    const qCarts = query(
      cartsColRef,
      where("items", "array-contains", courseId)
    );
    const qCartsSnapshot = await getDocs(qCarts);

    // 수정 혹은 삭제할 강좌 doc 참조 위치
    const courseDocRef = doc(db, COURSES_COLLECTION_NAME, courseId);

    // 3. 수강 신청 내역이나 장바구니 내역이 하나라도 있으면 소프트 삭제
    if (!qEnrollSnapshot.empty || !qCartsSnapshot.empty) {
      console.log("소프트 삭제 진행");
      await updateDoc(courseDocRef, {
        status: "archived",
      });
      return "강좌를 결제하거나, 장바구니에 담은 사용자가 있어 보관 처리되었습니다.";
    } else {
      // 4. 아무도 구매하거나 장바구니에 담지 않았으면 하드 삭제
      console.log("하드 삭제 진행");
      await deleteDoc(courseDocRef);
      return "강좌가 완전히 삭제되었습니다!";
    }
  } catch (error) {
    console.error("강좌 삭제 중 오류가 발생했습니다.", error);
    throw error;
  }
};

/**
 * @description Firestore의 강좌 문서를 업데이트합니다.
 * @param {string} courseId - 수정할 강좌의 고유 ID
 * @param {object} formData - 수정할 필드와 값이 담긴 객체
 */
const updateCourse = async (courseId, formData) => {
  try {
    const courseDocRef = doc(db, COURSES_COLLECTION_NAME, courseId);

    // 구조 분해를 통해 id 필드를 제외한 나머지 formData
    const { id, ...rest } = formData;
    const editedCourse = {
      ...rest,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(courseDocRef, editedCourse);
  } catch (error) {
    console.log("업데이트 중 오류가 발생했습니다.", error);
    throw error;
  }
};

export {
  getCategories,
  getFilteredCourses,
  getCourseById,
  createCourse,
  deleteCourseSafely,
  updateCourse,
};
