import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import "./CartPage.css";

import { useEffect, useMemo, useState } from "react";
import {
  getCarts,
  deleteCartItem,
  deleteCartsAll,
  addEnrollments,
} from "../../services/cartService";
import { getCourseById } from "../../services/courseService";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const USER_ID = "bbbbbbbbbqag3b";
function CartPage() {
  const [carts, setCarts] = useState([]); //장바구니 목록 원본 데이터
  const [courses, setCourses] = useState([]); //강좌 목록
  const navigate = useNavigate();

  const handleDelete = async (courseId) => {
    setCarts((prev) => prev.filter((prevItem) => prevItem !== courseId));
    setCourses((prev) => prev.filter((prevItem) => prevItem.id !== courseId));
    await deleteCartItem(USER_ID, courseId);
  };
  const hadleDeleteAll = async (USER_ID) => {
    //초기화
    setCarts([]);
    setCourses([]);
    await deleteCartsAll(USER_ID);
  };

  const handlePurchase = () => {
    // const userId = currentUser.uid;
    const userId = USER_ID;
    const fetchData = async () => {
      const tasks = courses.map((course) => {
        const doc = {
          courseId: course.id,
          instructorId: course.instructorId,
          userId,
          enrolledAt: serverTimestamp(),
        };
        return addEnrollments(doc);
      });
      // [addEnrollments(doc1), addEnrollments(doc2), addEnrollments(doc3), addEnrollments(doc4)]
      await Promise.all(tasks);
      await deleteCartsAll(USER_ID);
    };
    fetchData();
    //초기화
    setCarts([]);
    setCourses([]);
    navigate("/mypage");
  };

  // 1) 장바구니 목록을 최초 1회 불러옴
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCarts(USER_ID);
      setCarts(result);
    };
    fetchData();
  }, []);
  // 2) 총 개수(장바구니 아이템 수) 파생값이라 useMemo로 의존성 관리
  const totalCount = useMemo(() => {
    return carts.length;
  }, [carts]);
  // 3) 각 id에 대해 강좌 상세를 병렬로 요청
  useEffect(() => {
    if (!carts.length) return;
    try {
      const fetchData = async () => {
        // map()배열반환: 각 id에 대한 비동기 요청들을 배열로 만들고
        const tasks = carts.map((id) => getCourseById(id));
        // Promise.all로 병렬 처리 → 모든 상세가 완료되면 결과 배열을 받음
        const result = await Promise.all(tasks);
        setCourses(result ?? []);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [carts]);

  // 4) 총 금액: 불러온 강좌 상세(courses)의 price 합산
  const totalPrice = courses.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  return (
    <>
      {courses && (
        <main className="cart-page">
          <div className="page-wrapper cart-page__container">
            <CartList
              courses={courses}
              totalCount={totalCount}
              handleDelete={handleDelete}
              hadleDeleteAll={hadleDeleteAll}
            />
            <CartSummary
              totalCount={totalCount}
              totalPrice={totalPrice}
              handlePurchase={handlePurchase}
            />
          </div>
        </main>
      )}
    </>
  );
}

export default CartPage;
