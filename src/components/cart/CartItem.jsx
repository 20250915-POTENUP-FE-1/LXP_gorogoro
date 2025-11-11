import "./CartItem.css";

function CartItem({ course, handleDelete }) {
  if (!course) return null;

  return (
    <>
      {course && (
        <article className="cart-item">
          <div className="cart-item__thumbnail">
            <img className="cart-item__image" src={course.thumbnailUrl} />
          </div>
          <div className="cart-item__content">
            <span className="cart-item__category">{course.category}</span>
            <h3 className="cart-item__title">{course.title}</h3>
            <p className="cart-item__instructor">{course.instructor}</p>
            <time className="cart-item__date">{course.createdAt}</time>
          </div>
          <div className="cart-item__summary">
            <button
              className="cart-item__remove"
              type="button"
              onClick={() => handleDelete(course.id)}
            >
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
