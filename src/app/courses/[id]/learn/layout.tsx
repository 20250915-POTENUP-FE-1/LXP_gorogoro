import LearnHeader from "./components/LearnHeader";
import LearnSidebar from "./components/LearnSidebar";
import styles from "./layout.module.css";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <LearnSidebar />
      </aside>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div style={{ flex: 1 }}>
            <LearnHeader />
          </div>
        </header>
        <div className={styles.contentBody}>{children}</div>
      </div>
    </div>
  );
}
