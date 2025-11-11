import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import "./CartPage.css";

import { useEffect, useMemo, useState } from "react";
import { getCarts } from "../../services/cartService";
import { getCourseById } from "../../services/courseService";

function CartPage() {
  // carts: 장바구니 원본 데이터(각 항목에 courseId 포함)
  const [carts, setCarts] = useState([]);
  // courses: courseId로 조회한 실제 강좌 상세 목록
  const [courses, setCourses] = useState([]);

  // 1) 장바구니 목록을 최초 1회 불러옴
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCarts("gNpMmunioN2JyXVqag3q");
      setCarts(result);
    };
    fetchData();
  }, []);
  // 2) carts → courseIds 파생값(기존 상태(state)나 데이터로부터 계산해서 만들어지는 값) 생성
  //    - carts가 바뀔 때만 재계산
  //    - 각 cart 객체에서 courseId만 추출
  const courseIds = useMemo(() => {
    return carts.map((cart) => cart.courseId);
  }, [carts]);
  // 3) 총 개수(장바구니 아이템 수). 파생값이라 useMemo로 의존성 관리
  const totalCount = useMemo(() => {
    return carts.length;
  }, [carts]);
  // 4) courseIds가 준비되면, 각 id에 대해 강좌 상세를 병렬로 요청
  useEffect(() => {
    if (!courseIds.length) return;
    try {
      const fetchData = async () => {
        // map()배열반환: 각 courseId에 대한 비동기 요청들을 배열로 만들고
        const tasks = courseIds.map((id) => getCourseById(id));
        // Promise.all로 병렬 처리 → 모든 상세가 완료되면 결과 배열을 받음
        const result = await Promise.all(tasks);
        setCourses(result ?? []);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [courseIds]); // courseIds가 바뀔 때만 강좌 상세 재조회
  // 5) 총 금액: 불러온 강좌 상세(courses)의 price 합산
  const totalPrice = courses.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  return (
    <>
      {courses && (
        <main className="cart-page">
          <div className="page-wrapper cart-page__container">
            <CartList courses={courses} totalCount={totalCount} />
            <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
          </div>
        </main>
      )}
    </>
  );
}

export default CartPage;
