// import { getCourseLearn } from '@/services/course.service';
// import LearnHeader from '../../../../../features/courses/components/learn/LearnHeader';
// import LearnSidebar from '../../../../../features/courses/components/learn/LearnSidebar';
// import styles from './layout.module.css';
//
// export default async function LearnLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const course = await getCourseLearn(id);
//
//   return (
//     <div className={styles.container}>
//       <aside className={styles.sidebar}>{<LearnSidebar course={course} />}</aside>
//       <div className={styles.mainContent}>
//         <header className={styles.header}>
//           <div style={{ flex: 1 }}>{<LearnHeader course={course} />}</div>
//         </header>
//         <div className={styles.contentBody}>{children}</div>
//       </div>
//     </div>
//   );
// }
