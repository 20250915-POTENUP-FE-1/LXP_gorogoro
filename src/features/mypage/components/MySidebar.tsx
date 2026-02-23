import Link from 'next/link';
import styles from './MySidebar.module.css';
import Avatar from '@/shared/components/ui/Avatar';
import MySidebarSelector from '@/features/mypage/components/MySidebarSelector';
import { getMe } from '@/services/user.service';
import LogoutButton from '@/features/mypage/components/LogoutButton';
import { getRefreshApi } from '@/shared/lib/getRefreshApi';

export default async function MySidebar() {
  const me = await getMe().catch(async (error) => getRefreshApi(error));

  return (
    <aside className={styles.sidebar} aria-label="마이페이지 사이드바">
      <Avatar name={me?.name} role={me?.role} email={me?.email} />

      <nav className={styles.nav} aria-label="마이페이지 메뉴">
        <Link href="/mypage" className={`${styles.navItem}`}>
          <MySidebarSelector selectedPath="/mypage">프로필</MySidebarSelector>
        </Link>

        <Link href="/mypage/enrollment" className={`${styles.navItem}`}>
          <MySidebarSelector selectedPath="/mypage/enrollment">수강 중인 강좌</MySidebarSelector>
        </Link>

        <LogoutButton />

        {me?.role === 'INSTRUCTOR' && (
          <>
            <div
              style={{ borderTop: '1px solid #f2f4f7', paddingTop: '10px', position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: -12,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'white',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    fontSize: '12px',
                  }}
                >
                  강사
                </span>
              </div>
            </div>
            <Link href="/mypage/instructor" className={`${styles.navItem}`}>
              <MySidebarSelector selectedPath="/mypage/instructor">대시보드</MySidebarSelector>
            </Link>
            <Link href="/mypage/instructor/courses" className={`${styles.navItem}`}>
              <MySidebarSelector selectedPath="/mypage/instructor/courses">
                내가 생성한 강좌 목록
              </MySidebarSelector>
            </Link>

            <Link href="/mypage/instructor/create" className={`${styles.navItem}`}>
              <MySidebarSelector selectedPath="/mypage/instructor/create">
                새 강좌 만들기
              </MySidebarSelector>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
