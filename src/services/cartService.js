import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  where,
  limit,
  orderBy,
  query,
  updateDoc,
  arrayRemove,
  addDoc,
  setDoc,
  arrayUnion,
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
    const docRef = doc(db, CARTS_COLLECTION_NAME, uid);
    const docSnapshot = await getDoc(docRef);
    const dataSnapshotData = docSnapshot.data();
    const dataItem = dataSnapshotData.items ?? [];
    return dataItem;
  } catch (error) {
    throw error;
  }
};

//장바구니 강의 개별 삭제 deleteCartItem()
const deleteCartItem = async (userId, courseId) => {
  const docRef = doc(db, CARTS_COLLECTION_NAME, userId);
  await updateDoc(docRef, {
    items: arrayRemove(courseId),
  });
};

//장바구니 강의 전체 삭제 deleteCartsAll()
const deleteCartsAll = async (userId) => {
  const docRef = doc(db, CARTS_COLLECTION_NAME, userId);
  await updateDoc(docRef, {
    items: [],
  });
};

//장바구니 강의 마이페이지(enrollments)에 등록 addEnrollments()
const addEnrollments = async (enrollData) => {
  const colRef = collection(db, ENROLLMENTS_COLLECTION_NAME);
  await addDoc(colRef, {
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
  const querySnapshot = await getDocs(q);
  const querySnapshotData = querySnapshot.docs.map((doc) => doc.data());
  return querySnapshotData;
};

// 마이페이지: 수강 취소하기 버튼 클릭시 컨펌창 열리고 결과에 따라 enrollments 컬렉션에서 courseId, userId 기반으로 삭제하는 함수 구현
const deleteEnrollmentsById = async (userId, courseId) => {
  try {
    //1. 쿼리 사용해서 colRef의 1)userId필드값 = 매개변수userId 2)courseId필드값 = 매개변수courseID 3)내림차순 정렬로 구하기
    const colRef = collection(db, ENROLLMENTS_COLLECTION_NAME);
    const q = query(
      colRef,
      where("userId", "==", userId),
      where("courseId", "==", courseId),
      limit(1)
    );
    //2. querySnapshotData 필드를 찾았으면 enrollments 컬렉션에서 해당 필드를 삭제한다 -> 한건만 삭제(조건이 유일) -> [0]
    //3. delelteDoc 은 문서의 필드값들만 담은 순수 객체를 삭제하는게 아니라 문서의 참조를 삭제해야한다 -> querySnapshot.docs[0].data() X querySnapshot.docs[0].ref O
    const querySnapshot = await getDocs(q);
    const querySnapshotRef = querySnapshot.docs[0].ref;
    await deleteDoc(querySnapshotRef);
    return 1;
  } catch (error) {
    throw error;
  }
};

//장바구니 담기 addCartItem()
const addCartItem = async (userId, courseId) => {
  const docRef = doc(db, CARTS_COLLECTION_NAME, userId);
  await setDoc(docRef, { items: arrayUnion(courseId) }, { merge: true });
};
export {
  getCarts,
  deleteCartItem,
  deleteCartsAll,
  addEnrollments,
  getEnrollmentsById,
  deleteEnrollmentsById,
  addCartItem,
};
