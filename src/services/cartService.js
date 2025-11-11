import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  where,
  orderBy,
  query,
  updateDoc,
  arrayRemove,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
//전체 장바구니 목록 조회 getCarts()
/**
 * @param {string} uid -조회할 users의 uid
 * @return {Promise<CartItem[]>} 장바구니 아이템 배열(없으면 [])
 */
const CARTS_COLLECTION_NAME = "carts";
const ENROLLMENTS_COLLECTION_NAME = "enrollments";
const getCarts = async (uid) => {
  try {
    const docSnapshot = await getDoc(doc(db, CARTS_COLLECTION_NAME, uid));
    const dataSnapshotData = docSnapshot.data();
    const dataItem = dataSnapshotData.items ?? [];
    return dataItem;
  } catch (error) {
    throw error;
  }
};

//장바구니 강의 개별 삭제 deleteCartItem()
const deleteCartItem = async (userId, courseId) => {
  const ref = doc(db, CARTS_COLLECTION_NAME, userId);
  await updateDoc(ref, {
    items: arrayRemove(courseId),
  });
};

//장바구니 강의 전체 삭제 deleteCartsAll()
const deleteCartsAll = async (userId) => {
  const ref = doc(db, CARTS_COLLECTION_NAME, userId);
  await updateDoc(ref, {
    items: [],
  });
};

//장바구니 강의 마이페이지(enrollments)에 등록 addEnrollments()
const addEnrollments = async (enrollData) => {
  await addDoc(collection(db, ENROLLMENTS_COLLECTION_NAME), {
    ...enrollData,
  });
};
//마이페이지 : userId가 일치하는 enrollments 컬렉션 가져오기
const getEnrollmentsById = async (userId) => {
  const colRef = collection(db, ENROLLMENTS_COLLECTION_NAME);
  const q = query(
    colRef,
    where("userId", "==", userId),
    orderBy("enrolledAt", "desc")
  );
  const qeurySnapshot = await getDocs(q);
  const qeurySnapshotData = qeurySnapshot.docs.map((doc) => doc.data());
  return qeurySnapshotData;
};
// getEnrollmentsById("gNpMmunioN2JyXVqag3q");
export {
  getCarts,
  deleteCartItem,
  deleteCartsAll,
  addEnrollments,
  getEnrollmentsById,
};
