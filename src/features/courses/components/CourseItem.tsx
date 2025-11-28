import Link from "next/link";
import "./CourseItem.css";

export default function CourseItem({ course }: any) {
  return (
    <Link href={`/courses/${course.id}`}>
      <article className="course-item" key={course.id}>
        <div className="course-item__image-wrapper">
          <img className="course-item__image" src={course.thumbnailUrl} />
        </div>
        <div className="course-item__body">
          <p className="course-item__category">{course.category}</p>
          <h3 className="course-item__title">{course.title}</h3>
          <p className="course-item__price">{course.price}</p>
          <p className="course-item__instructor">{course.instructorName}</p>
        </div>
      </article>
    </Link>
  );
}
