import "./EnrollmentItem.css";

const enrollmentItems = [
  {
    category: "웹 개발",
    title: "실전! 리액트 프로그래밍",
    instructor: "강사: 이현우",
    enrolledAt: "2023.10.26",
    price: "₩55,000",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "데이터 사이언스",
    title: "파이썬으로 시작하는 데이터 분석",
    instructor: "강사: 박서연",
    enrolledAt: "2023.09.15",
    price: "₩79,000",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "백엔드",
    title: "Node.js 마스터 클래스",
    instructor: "강사: 최지훈",
    enrolledAt: "2023.08.01",
    price: "₩120,000",
    image:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "디자인",
    title: "UI/UX 디자인 완전 정복",
    instructor: "강사: 정수아",
    enrolledAt: "2023.07.20",
    price: "₩98,000",
    image:
      "https://images.unsplash.com/photo-1523475472560-682b86683fc9?auto=format&fit=crop&w=320&q=80",
  },
];

function EnrollmentItem() {
  return (
    <>
      {enrollmentItems.map((item) => (
        <article className="enrollment-item" key={item.title}>
          <div className="enrollment-item__thumbnail">
            <img
              className="enrollment-item__image"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="enrollment-item__body">
            <div className="enrollment-item__category">{item.category}</div>
            <h3 className="enrollment-item__title">{item.title}</h3>
            <p className="enrollment-item__instructor">{item.instructor}</p>
          </div>
          <div className="enrollment-item__meta">
            <time
              className="enrollment-item__date"
              dateTime={item.enrolledAt.replace(/\./g, "-")}
            >
              {item.enrolledAt}
            </time>
            <span className="enrollment-item__price">{item.price}</span>
            <button className="enrollment-item__action" type="button">
              수강 취소하기
            </button>
          </div>
        </article>
      ))}
    </>
  );
}

export default EnrollmentItem;
