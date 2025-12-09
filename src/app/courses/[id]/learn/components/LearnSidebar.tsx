"use client";

import styles from "./LearnSidebar.module.css";
import { MOCK_COURSE } from "./mockData";

export default function LearnSidebar() {
  const { title, progress, chapters } = MOCK_COURSE;

  return (
    <div className={styles.container}>
      <div className={styles.courseHeader}>
        <div className={styles.courseTitle}>{title}</div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className={styles.progressText}>{progress}% complete</div>
      </div>

      <div className={styles.chapterList}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>{chapter.title}</div>
            <ul className={styles.lectureList}>
              {chapter.lectures.map((lecture) => (
                <li
                  key={lecture.id}
                  className={`${styles.lectureItem} ${
                    lecture.current ? styles.lectureItemActive : ""
                  }`}
                >
                  <div
                    className={`${styles.checkbox} ${
                      lecture.completed ? styles.completed : ""
                    }`}
                  >
                    {lecture.completed && "✓"}
                  </div>
                  <div>
                    <div>{lecture.title}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      ({lecture.duration})
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
