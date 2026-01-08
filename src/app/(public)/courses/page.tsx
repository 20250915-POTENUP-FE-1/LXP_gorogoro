import styles from './page.module.css';
import { Metadata } from 'next';

type CoursePageSearchParams = {
  categoryId?: string;
  search?: string;
  sort?: string;
};

export const metadata: Metadata = {
  title: '전체 강의',
  description: '관심 있는 강의를 탐색하고 커리큘럼, 난이도, 수강 기간을 한눈에 확인하세요.',
};

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<CoursePageSearchParams>;
}) {
  // const filters = await searchParams;
  // const categoryQuery = filters.categoryId || '';
  // const searchQuery = filters.search || '';
  // const sortQuery = filters.sort || '';
  //
  // const { contents: categories } = await getAllCategories();
  //
  // let subCategories: Category[] = [];
  // let categoryName = '';
  //
  // // categoryId 없을 때는 courses 호출하지 않도록 기본값 세팅
  // let courses: any[] = [];
  //
  // if (categoryQuery) {
  //   const currentCategory = await getCategoriesById(categoryQuery);
  //
  //   // categoryQuery가 1차 카테고리면 그대로 subCategories 사용
  //   // categoryQuery가 2차 카테고리면 부모의 subCategories 가져오기
  //   if (currentCategory.parentId === null) {
  //     // 1차 카테고리
  //     categoryName = currentCategory.name;
  //     subCategories = currentCategory.subCategories ?? [];
  //   } else {
  //     // 2차 카테고리 → 부모 카테고리의 subCategories 가져오기
  //     const parentCategory = await getCategoriesById(String(currentCategory.parentId));
  //     categoryName = currentCategory.name;
  //     subCategories = parentCategory.subCategories ?? [];
  //   }
  //   // categoryQuery 있을 때만 호출
  //   const apiParams = {
  //     categoryId: categoryQuery,
  //     search: searchQuery,
  //     sort: sortQuery,
  //     limit: '10',
  //   };
  //   const { contents } = await getCourses(apiParams);
  //   courses = contents;
  // }

  // const pageTitle = searchQuery ? `"${searchQuery}" 검색 결과` : `${categoryName} 강좌`;

  return (
    <main className={styles.page}>
      {/*{!categoryQuery ? (*/}
      {/*  // 카테고리 선택 페이지*/}
      {/*  <div className={`page-wrapper ${styles.container}`}>*/}
      {/*    <section className={styles.intro}>*/}
      {/*      <h1 className={styles.title}>강좌 카테고리</h1>*/}
      {/*      <p className={styles.subtitle}>관심있는 카테고리를 선택해주세요</p>*/}
      {/*    </section>*/}
      {/*    <div className={styles.categoryGrid}>*/}
      {/*      {categories.map((category) => (*/}
      {/*        <Link key={category.id} href={`/courses?categoryId=${category.id}`}>*/}
      {/*          <div className={styles.categoryCard}>*/}
      {/*            <h2>{category.name}</h2>*/}
      {/*            <p>{category.subCategories?.length || 0}개 세부 카테고리</p>*/}
      {/*          </div>*/}
      {/*        </Link>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  // 기존 강좌 목록 페이지*/}
      {/*  <div className={`page-wrapper ${styles.container}`}>*/}
      {/*    <section className={styles.intro}>*/}
      {/*      <h1 className={styles.title}>{pageTitle}</h1>*/}
      {/*      <span className={styles.subtitle}>총 {courses.length}개의 강좌</span>*/}
      {/*    </section>*/}
      {/*    <CategoryBar subCategories={subCategories} />*/}
      {/*    <CourseList courses={courses} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </main>
  );
}
