import { Metadata } from 'next';
import styles from '@/features/mypage/components/EnrollmentList.module.css';
import EnrollmentItem from '@/features/mypage/components/EnrollmentItem';

export const metadata: Metadata = {
  title: '수강 내역',
  description: '수강 중인 강의와 완료한 강의를 확인하고 학습 기록을 관리하세요.',
};

export default async function EnrollmentPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return (
    <section className={styles.list}>
      <h1 className={styles.title}>총 1개의 수강중인 강좌</h1>
      <div className={styles.items}>
        {/*{courses.map((course) => (*/}
        <EnrollmentItem />
        {/* ))}*/}
      </div>
    </section>
  );
}
