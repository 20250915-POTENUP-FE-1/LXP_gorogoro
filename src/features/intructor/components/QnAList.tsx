import styles from "./QnAList.module.css";

interface QnAItem {
  id: string;
  title: string;
  author: string;
  date: string;
  courseTitle: string;
}

interface QnAListProps {
  items: QnAItem[];
}

export default function QnAList({ items }: QnAListProps) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Q&A 미답변 리스트</h2>
      </header>

      {items.length > 0 ? (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <div className={styles.itemMeta}>
                  <span>{item.courseTitle}</span>
                  <span className={styles.separator}>|</span>
                  <span>{item.author}</span>
                  <span className={styles.separator}>|</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>미답변 질문이 없습니다.</div>
      )}
    </section>
  );
}
