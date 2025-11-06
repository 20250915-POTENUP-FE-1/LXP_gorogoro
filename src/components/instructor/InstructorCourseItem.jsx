import "./InstructorCourseItem.css";

const instructorCourses = [
  {
    category: "Web Development",
    title: "실전! 웹사이트 만들기 A to Z",
    instructor: "강사: Jane Doe",
    createdAt: "생성일: 2023.10.26",
    price: "₩55,000",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "Programming",
    title: "초보자를 위한 JavaScript 기초",
    instructor: "강사: Jane Doe",
    createdAt: "생성일: 2023.09.15",
    price: "₩49,000",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "Data Science",
    title: "파이썬 데이터 분석 입문",
    instructor: "강사: Jane Doe",
    createdAt: "생성일: 2023.08.01",
    price: "₩78,000",
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=320&q=80",
  },
  {
    category: "Design",
    title: "Figma를 활용한 UI/UX 디자인",
    instructor: "강사: Jane Doe",
    createdAt: "생성일: 2023.07.22",
    price: "₩60,000",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=320&q=80",
  },
];

function InstructorCourseItem() {
  return (
    <>
      {instructorCourses.map((course) => (
        <article className="instructor-course-item" key={course.title}>
          <div className="instructor-course-item__thumbnail">
            <img
              className="instructor-course-item__image"
              src={course.image}
              alt={course.title}
            />
          </div>
          <div className="instructor-course-item__body">
            <span className="instructor-course-item__category">
              {course.category}
            </span>
            <h3 className="instructor-course-item__title">{course.title}</h3>
            <p className="instructor-course-item__instructor">
              {course.instructor}
            </p>
          </div>
          <div className="instructor-course-item__meta">
            <span className="instructor-course-item__price">{course.price}</span>
            <span className="instructor-course-item__date">
              {course.createdAt}
            </span>
            <div className="instructor-course-item__actions">
              <button
                className="instructor-course-item__action instructor-course-item__action--edit"
                type="button"
              >
                수정하기
              </button>
              <button
                className="instructor-course-item__action instructor-course-item__action--delete"
                type="button"
              >
                삭제하기
              </button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

export default InstructorCourseItem;
