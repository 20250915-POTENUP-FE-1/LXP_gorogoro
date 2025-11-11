import CartItem from "./CartItem";
import "./CartList.css";

function CartList({ courses, totalCount }) {
  return (
    <section className="cart-list">
      <div className="cart-list__header">
        <h1 className="cart-list__title">총 {totalCount}개의 강좌</h1>
        <button className="cart-list__clear-button" type="button">
          전체 삭제
        </button>
      </div>
      <div className="cart-list__items">
        {courses.map((course) => (
          <CartItem key={course.id ?? course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}

export default CartList;
