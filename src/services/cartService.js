import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

//전체 장바구니 목록 조회 getCarts()
const CARTS_COLLECTION_NAME = "carts";
export const getCarts = async (uid) => {
  try {
    const docSnapshot = await getDoc(doc(db, CARTS_COLLECTION_NAME, uid));
    const dataSnapshotData = docSnapshot.data();
    const dataItem = dataSnapshotData.items;
    return dataItem;
  } catch (error) {
    throw error;
  }
};
//장바구니 강의 전체 삭제 deleteCarts()
//장바구니 강의 개별 삭제 deleteCart()
