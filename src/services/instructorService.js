import { collection, getDocs, orderBy, where, query } from "firebase/firestore";

import { db } from "../firebase/config.js";

const COURSES_COLLECTION_NAME = "courses";

const getIntstructorCourses = async (instructorId) => {
  try {
    const colRef = collection(db, COURSES_COLLECTION_NAME);
    const q = query(colRef, where("instructorId", "==", instructorId));

    const querySnapshot = await getDocs(q);

    // 강의가 없을 시 안내 문구 반환
    if (querySnapshot.docs.length === 0) return "아직 강좌를 만들지 않았어요.";

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));

    return courses;
  } catch (error) {
    return "강의를 불러들이는데 문제가 발생했습니다" + error;
  }
};

export { getIntstructorCourses };
