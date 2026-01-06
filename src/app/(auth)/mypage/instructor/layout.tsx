import InstructorSidebar from "@/features/intructor/components/InstructorSidebar";
import styles from "./layout.module.css";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.layout}>
      <div className={styles.content}>
        <InstructorSidebar />
        {children}
      </div>
    </main>
  );
}
