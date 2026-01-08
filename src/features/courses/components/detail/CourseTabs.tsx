import { Button } from '@/shared/components/ui/Button';
import styles from './CourseDetail.module.css';
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
  { key: 'request', label: '문의' },
];

export default function CourseTabs({ activeTab, handleChangeTab }: CourseTabsProps) {
  return (
    <div className={styles.tabContainer}>
      {TAB_ITEMS.map((tab) => (
        <Button
          variant="tab"
          type="button"
          key={tab.key}
          className={tab.key === activeTab ? styles.activeTab : ''}
          onClick={() => handleChangeTab(tab.key)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
