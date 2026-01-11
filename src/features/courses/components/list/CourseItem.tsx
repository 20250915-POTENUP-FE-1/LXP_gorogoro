'use client';
import Link from 'next/link';
import styles from './CourseItem.module.css';
import { Course } from '../../types';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/Button';

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <Link href={`/courses/${course.courseId}`}>
      <article className={styles.item} key={course.courseId}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={course.coverImageUrl}
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.price}>{course.price.toLocaleString()}원</p>
          <p className={styles.instructor}>{course.name}</p>
          <div className={styles.BtnBox}>
            <Button variant={'primary'}>장바구니 담기</Button>
            <Button variant={'primary'}>결제하기</Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
