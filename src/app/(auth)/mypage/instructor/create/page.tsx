import CourseForm from '@/features/intructor/components/CourseForm';
import styles from './page.module.css';
import { getAllCategories } from '@/services/category.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강의 개설',
  description: '새 강의를 생성하고 기본 정보와 커리큘럼을 등록하세요.',
};

export default async function CourseCreatePage() {
  const { contents: categories } = await getAllCategories();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 강좌 생성하기</h1>
        <p className={styles.subtitle}>새 강좌를 만들고 지식을 공유해주세요!</p>
      </header>
      <CourseForm categories={categories} />
    </section>
  );
}
