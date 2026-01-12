'use client';

import Link from 'next/link';
import styles from './MySidebar.module.css';
import { logoutAction } from '@/features/auth/actions/logout.action';
import { useAuthStore } from '@/stores/useAuthStore';
import Avatar from '@/shared/components/ui/Avatar';
import { usePathname } from 'next/navigation';

export default function MySidebar() {
  const pathname = usePathname();
  const userProfile = useAuthStore((state) => state.userProfile);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    clearUser(); // zustand 상태 초기화 (localStorage도 자동 반영)
    await logoutAction(); // 서버 쿠키 삭제 및 리다이렉트
  };

  const isProfileActive = pathname === '/mypage';
  const isEnrollmentActive =
    pathname === '/mypage/enrollment' || pathname.startsWith('/mypage/enrollment/');
  const isInstructorDashboardActive = pathname === '/mypage/instructor';
  const isInstructorCoursesActive =
    pathname === '/mypage/instructor/courses' || pathname.startsWith('/mypage/instructor/courses/');
  const isInstructorCreateActive =
    pathname === '/mypage/instructor/create' || pathname.startsWith('/mypage/instructor/create/');

  return (
    <aside className={styles.sidebar} aria-label="마이페이지 사이드바">
      <Avatar
        nickname={userProfile?.nickname}
        role={userProfile?.role}
        email={userProfile?.email}
      />

      <nav className={styles.nav} aria-label="마이페이지 메뉴">
        <Link
          href="/mypage/profile"
          className={`${styles.navItem}${isProfileActive ? ` ${styles.navItemActive}` : ''}`}
          aria-current={isProfileActive ? 'page' : undefined}
        >
          프로필
        </Link>

        <Link
          href="/mypage/enrollment"
          className={`${styles.navItem}${isEnrollmentActive ? ` ${styles.navItemActive}` : ''}`}
          aria-current={isEnrollmentActive ? 'page' : undefined}
        >
          수강 중인 강좌
        </Link>

        <button className={styles.navItem} type="button" onClick={handleLogout}>
          로그아웃
        </button>

        {userProfile?.role === 'INSTRUCTOR' && (
          <>
            <div
              style={{ borderTop: '1px solid #f2f4f7', paddingTop: '10px', position: 'relative' }}
            >
              <div
                style={{ position: 'absolute', left: 0, right: 0, top: -14, textAlign: 'center' }}
              >
                강사
              </div>
            </div>
            <Link
              href="/mypage/instructor"
              className={`${styles.navItem}${isInstructorDashboardActive ? ` ${styles.navItemActive}` : ''}`}
              aria-current={isInstructorDashboardActive ? 'page' : undefined}
            >
              대시보드
            </Link>

            <Link
              href="/mypage/instructor/courses"
              className={`${styles.navItem}${isInstructorCoursesActive ? ` ${styles.navItemActive}` : ''}`}
              aria-current={isInstructorCoursesActive ? 'page' : undefined}
            >
              내가 생성한 강좌 목록
            </Link>

            <Link
              href="/mypage/instructor/create"
              className={`${styles.navItem}${isInstructorCreateActive ? ` ${styles.navItemActive}` : ''}`}
              aria-current={isInstructorCreateActive ? 'page' : undefined}
            >
              새 강좌 만들기
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
