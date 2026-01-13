import styles from './CourseTabs.module.css';
import { TabKey } from '@/features/courses/types';

interface CourseTabsProps {
  activeTab: TabKey;
  handleChangeTab: (tab: TabKey) => void;
}
const TAB_ITEMS: Array<{ key: TabKey; label: string }> = [
  {
    key: 'description',
    label: '상세정보',
  },
  { key: 'curriculum', label: '커리큘럼' },
  { key: 'review', label: '리뷰' },
];

export default function CourseTabs({ activeTab, handleChangeTab }: CourseTabsProps) {
  return (
    <>
      <div className={styles.container}>
        {TAB_ITEMS.map((tab) => (
          <button
            type="button"
            key={tab.key}
            className={[styles.tabButton, activeTab === tab.key ? styles.active : ''].join(' ')}
            onClick={() => handleChangeTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
