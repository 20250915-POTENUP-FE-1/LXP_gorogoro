import styles from './VideoCard.module.css';
export default function VideoCard({ lessonTitle }: { lessonTitle: string }) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.playOverlay}>
        <div className={styles.playIcon}>▶</div>
        <div className={styles.videoTitle}>{lessonTitle}</div>
      </div>
    </div>
  );
}
