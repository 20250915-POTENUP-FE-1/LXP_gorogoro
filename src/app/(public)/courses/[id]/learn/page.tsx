// import styles from './page.module.css';
// import { Metadata } from 'next';
//
// export const metadata: Metadata = {
//   title: '수강하기',
//   description: '강의 콘텐츠를 학습하고 진도를 관리하며, 필요한 자료를 바로 확인하세요.',
// };
//
// export default async function LearnPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ chapter?: string; lesson?: string }>;
// }) {
//   const { id } = await params;
//   const { chapter, lesson } = await searchParams;
//   const course = await getCourseLearn(id);
//
//   // searchParams에서 현재 챕터와 레슨 가져오기, 없으면 첫 번째 레슨
//   const currentChapterSeq = chapter ? parseInt(chapter) : course.contents[0]?.seq;
//   const currentLessonSeq = lesson ? parseInt(lesson) : course.contents[0]?.lessons[0]?.seq;
//
//   const currentChapter = course.contents.find((ch) => ch.seq === currentChapterSeq);
//   const currentLecture = currentChapter?.lessons.find((l) => l.seq === currentLessonSeq);
//
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100%',
//         padding: '40px',
//       }}
//     >
//       <h1 className={styles.lectureTitle}>
//         {currentLecture ? currentLecture.title : 'Select a lecture'}
//       </h1>
//
//       <div className={styles.videoContainer}>
//         {currentLecture ? (
//           <div className={styles.placeholder}>
//             <div className={styles.playButton} role="button">
//               <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//             {/* <p style={{marginTop: 20}}>Video Player Placeholder</p> */}
//           </div>
//         ) : (
//           <div className={styles.placeholder}>Select a lecture to start</div>
//         )}
//       </div>
//
//       <div
//         style={{
//           marginTop: '40px',
//           color: '#9ca3af',
//           maxWidth: '1000px',
//           width: '100%',
//         }}
//       >
//         <h3>About this lecture</h3>
//         <p>
//           In this lecture, we will cover the basics of {currentLecture?.title}. Changes in ES6 are
//           fundamental to modern React development.
//         </p>
//       </div>
//     </div>
//   );
// }
