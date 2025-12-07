import styles from "./DashboardStats.module.css";

interface StatItem {
  label: string;
  value: string | number;
}

interface DashboardStatsProps {
  stats: StatItem[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className={styles.grid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.card}>
          <span className={styles.label}>{stat.label}</span>
          <span className={styles.value}>{stat.value}</span>
        </div>
      ))}
    </section>
  );
}
