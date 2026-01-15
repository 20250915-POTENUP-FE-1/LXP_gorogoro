import styles from './page.module.css';
import ProfileEditForm from '@/features/mypage/components/ProfileEditForm';
import { Metadata } from 'next';
import { getMe } from '@/services/user.service';
import { getRefreshApi } from '@/shared/lib/getRefreshApi';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 수강 현황과 계정 정보를 관리하고 학습 진행 상황을 확인하세요.',
};

export default async function ProfilePage() {
  const me = await getMe().catch(async (error) => getRefreshApi(error));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>내 정보 수정</h1>
      <ProfileEditForm name={me.name} email={me.email} />
    </div>
  );
}
