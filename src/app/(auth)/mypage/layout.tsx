import MySidebar from "@/features/mypage/components/MySidebar";
import styles from "./layout.module.css";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <MySidebar />
        {children}
      </div>
    </main>
  );
}
