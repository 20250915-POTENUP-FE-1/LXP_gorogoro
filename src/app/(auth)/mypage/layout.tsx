import MySidebar from '@/features/mypage/components/MySidebar';
import styles from './layout.module.css';

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={`${styles.container}`} style={{ paddingRight: '3rem', paddingLeft: '3rem' }}>
        <MySidebar />
        {children}
      </div>
    </main>
  );
}
