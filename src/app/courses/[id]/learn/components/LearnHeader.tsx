"use client";

import Link from "next/link";
import styles from "./LearnHeader.module.css";
import { useRouter } from "next/navigation";

export default function LearnHeader() {
  const router = useRouter();

  return (
    <div className={styles.actions}>
      <Link
        href="/"
        className={`${styles.button} ${styles.buttonSecondary}`}
        style={{ marginRight: "auto" }}
      >
        ← Go Home
      </Link>

      {/* Spacer using auto margin in parent or flex settings, here implied */}

      <button className={`${styles.button} ${styles.buttonSecondary}`}>
        Hide Sidebar
      </button>

      <button className={`${styles.button} ${styles.buttonSecondary}`}>
        ← Previous Lecture
      </button>

      <button className={`${styles.button} ${styles.buttonPrimary}`}>
        Complete and Continue →
      </button>
    </div>
  );
}
