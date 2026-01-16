'use client';
import styles from './InstructorCourseItem.module.css';
import { DeleteCourseAction } from '../action';
import { useRouter } from 'next/navigation';
import { InstructorCourse } from '../types';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/Button';
import { useResolveCoverSrc } from '@/shared/utils/resolveCoverSrc';

interface InstructorCourseItemProps {
  course: InstructorCourse;
}

export default function InstructorCourseItem({ course }: InstructorCourseItemProps) {
  const router = useRouter();
  const courseId = course.courseId;
  const handleClickEdit = () => {
    router.push(`/mypage/instructor/courses/${courseId}/edit`);
  };
  const handleClickDelete = async () => {
    if (confirm('삭제 하시겠습니까?')) {
      await DeleteCourseAction(courseId);
    }
  };
  return (
    <article className={`${styles.item}`}>
      <div className={styles.thumbnail}>
        <Image
          className={styles.image}
          src={useResolveCoverSrc(course.coverImageUrl)}
          alt={course.title}
          width={500}
          height={300}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>
        <div className={styles.stats}>
          <span className={styles.levelBadge}>{course.difficulty}</span>
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statLabel}>평점(4.5)</span>*/}
          {/*  {course.rating}*/}
          {/*</div>*/}
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statLabel}>리뷰(11)</span>*/}
          {/*  {course.reviewCount}*/}
          {/*</div>*/}
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statLabel}>수강생(23)</span>*/}
          {/*  {course.studentCount}*/}
          {/*</div>*/}
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statLabel}>♥️좋아요(78)</span>*/}
          {/*  {course.likeCount}*/}
          {/*</div>*/}
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.price}>{course.price}</span>
        <div className={styles.actions}>
          <Button variant="edit" size="sm" type="button" onClick={handleClickEdit}>
            수정하기
          </Button>
          <Button variant="delete" size="sm" type="button" onClick={handleClickDelete}>
            삭제하기
          </Button>
        </div>
      </div>
    </article>
  );
}
