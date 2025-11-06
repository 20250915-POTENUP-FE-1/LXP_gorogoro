import "./CartItem.css";

const cartItems = [
  {
    category: "프로그래밍 기초",
    title: "완전 초보를 위한 파이썬",
    instructor: "김강사",
    addedAt: "2023-10-27",
    price: "₩55,000",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "데이터 분석",
    title: "SQL로 시작하는 데이터 분석",
    instructor: "박분석",
    addedAt: "2023-10-26",
    price: "₩79,000",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "웹 개발",
    title: "실전! 리액트와 타입스크립트",
    instructor: "이개발",
    addedAt: "2023-10-25",
    price: "₩120,000",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "디자인",
    title: "피그마를 활용한 UI/UX 디자인",
    instructor: "최디자인",
    addedAt: "2023-10-24",
    price: "₩99,000",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=320&q=80",
  },
];

function CartItem() {
  return (
    <>
      {cartItems.map((item) => (
        <article className="cart-item" key={item.title}>
          <div className="cart-item__thumbnail">
            <img
              className="cart-item__image"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="cart-item__content">
            <header className="cart-item__header">
              <span className="cart-item__category">{item.category}</span>
              <button className="cart-item__remove" type="button">
                삭제
              </button>
            </header>
            <h3 className="cart-item__title">{item.title}</h3>
            <p className="cart-item__instructor">{item.instructor}</p>
            <time className="cart-item__date" dateTime={item.addedAt}>
              {item.addedAt}
            </time>
          </div>
          <div className="cart-item__price">{item.price}</div>
        </article>
      ))}
    </>
  );
}

export default CartItem;
