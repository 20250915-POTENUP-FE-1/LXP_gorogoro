import { Metadata } from 'next';
import styles from '@/features/mypage/components/EnrollmentList.module.css';
import { getMe } from '@/services/user.service';
import { getMyEnrollments } from '@/services/course.service';
import EnrollmentList from '@/features/mypage/components/EnrollmentList';

export const metadata: Metadata = {
  title: '수강 내역',
  description: '수강 중인 강의와 완료한 강의를 확인하고 학습 기록을 관리하세요.',
};

export default async function EnrollmentPage() {
  const me = await getMe();
  const userId = me.userId;
  console.log(`userId: `, userId);

  if (!me || !me.userId) {
    return <div>로그인이 필요한 서비스입니다.</div>;
  }
  const enrollments = await getMyEnrollments(userId);
  console.log(enrollments);
  const enrollCount = enrollments?.contents?.length || 0;
  return (
    <section className={styles.list}>
      <h1 className={styles.title}>총 {enrollCount}개의 수강중인 강좌</h1>
      <div className={styles.items}>
        {enrollCount > 0 ? (
          <EnrollmentList enrollments={enrollments} />
        ) : (
          <div>수강신청한 강좌가 없습니다.</div>
        )}
      </div>
    </section>
  );
}
