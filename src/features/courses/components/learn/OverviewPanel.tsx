import styles from './OverviewPanel.module.css';
export default function OverviewPanel({ lessonTitle }: { lessonTitle: string }) {
  return (
    <section>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeading}>About this Lesson</h3>
        <p className={styles.text}>
          이 레슨에서는 <strong>{lessonTitle}</strong>에 대해 심도 있게 다룹니다. 기초 개념부터 실무
          적용 사례까지 차근차근 확인해보세요. 강의 내용을 따라하면서 직접 코드를 작성해보는 것을
          권장합니다.
        </p>
      </div>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeading}>Key Takeaways</h3>
        <ul className={styles.bulletList}>
          <li>핵심 개념 이해 및 구조 파악</li>
          <li>실무에서 자주 쓰이는 패턴 습득</li>
          <li>트러블슈팅 및 성능 최적화 팁</li>
        </ul>
      </div>
    </section>
  );
}
