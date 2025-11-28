import "./CartItem.css";

export default function CartItem({ course, handleDelete }: any) {
  return (
    <article className="cart-item">
      <div className="cart-item__thumbnail">
        <img className="cart-item__image" src={course.thumbnailUrl} />
      </div>
      <div className="cart-item__content">
        <span className="cart-item__category">{course.category}</span>
        <h3 className="cart-item__title">{course.title}</h3>
        <p className="cart-item__instructor">{course.instructor}</p>
        {/* toLocaleDateString()을 사용해 Date 객체를 문자열로 변환 */}
        <time dateTime={course.createdAt?.toISOString()}>
          {course.createdAt?.toLocaleDateString("ko-KR")}
        </time>{" "}
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
  );
}
