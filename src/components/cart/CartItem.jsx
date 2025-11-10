import "./CartItem.css";
import { getCourseById } from "../../services/courseService";
import { useEffect, useState } from "react";

function CartItem({ cart }) {
  const { courseId, addedAt } = cart;
  const [course, setCourse] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCourseById(courseId);
      setCourse(result);
    };

    fetchData();
  }, []);
  return (
    <>
      {course && (
        <article className="cart-item" key={course.title}>
          <div className="cart-item__thumbnail">
            <img className="cart-item__image" src={course.thumbnailUrl} />
          </div>
          <div className="cart-item__content">
            <span className="cart-item__category">{course.category}</span>
            <h3 className="cart-item__title">{course.title}</h3>
            <p className="cart-item__instructor">{course.instructor}</p>
            <time className="cart-item__date" dateTime={addedAt}>
              {addedAt}
            </time>
          </div>
          <div className="cart-item__summary">
            <button className="cart-item__remove" type="button">
              삭제
            </button>
            <p className="cart-item__price">{course.price}</p>
          </div>
        </article>
      )}
    </>
  );
}

export default CartItem;
