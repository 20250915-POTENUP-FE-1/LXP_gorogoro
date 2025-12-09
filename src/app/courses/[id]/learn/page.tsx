import styles from "./page.module.css";
import { MOCK_COURSE } from "./components/mockData";

export default function LearnPage() {
  const currentChapter = MOCK_COURSE.chapters.find((ch) =>
    ch.lectures.some((l) => l.current)
  );
  const currentLecture = currentChapter?.lectures.find((l) => l.current);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "40px",
      }}
    >
      <h1 className={styles.lectureTitle}>
        {currentLecture ? currentLecture.title : "Select a lecture"}
      </h1>

      <div className={styles.videoContainer}>
        {currentLecture ? (
          <div className={styles.placeholder}>
            <div className={styles.playButton} role="button">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {/* <p style={{marginTop: 20}}>Video Player Placeholder</p> */}
          </div>
        ) : (
          <div className={styles.placeholder}>Select a lecture to start</div>
        )}
      </div>

      <div
        style={{
          marginTop: "40px",
          color: "#9ca3af",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <h3>About this lecture</h3>
        <p>
          In this lecture, we will cover the basics of {currentLecture?.title}.
          Changes in ES6 are fundamental to modern React development.
        </p>
      </div>
    </div>
  );
}
