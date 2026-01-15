import styles from './VideoCard.module.css';
export default function VideoCard() {
  return (
    <div className={styles.videoCard}>
      <div className={styles.playOverlay}>
        <div className={styles.playIcon}>▶</div>
        <div>비디오</div>
        {/*<div className={styles.videoTitle}>{lessonTitle}</div>*/}
      </div>
    </div>
  );
}
