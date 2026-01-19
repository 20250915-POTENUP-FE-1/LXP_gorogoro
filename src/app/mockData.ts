import {
  CourseDetailResponse,
  CoursesResponse,
  LessonQnaListResponse,
  QnaThreadResponse,
  ReviewListResponse,
} from '@/features/courses/types';

export const MOCK_COURSES: CoursesResponse = {
  contents: [
    {
      courseId: 1,
      title: '리액트 기초부터 실전까지',
      price: 55000,
      name: '김프론트',
      coverImageUrl: 'https://picsum.photos/seed/course1/400/300',
      category: {
        id: 7,
        name: '프론트엔드',
        parent: {
          id: 1,
          name: '개발·프로그래밍',
        },
      },
    },
    {
      courseId: 2,
      title: '타입스크립트 완전 정복',
      price: 60000,
      name: '이타입',
      coverImageUrl: 'https://picsum.photos/seed/course2/400/300',
      category: {
        id: 7,
        name: '프론트엔드',
        parent: {
          id: 1,
          name: '개발·프로그래밍',
        },
      },
    },
    {
      courseId: 3,
      title: 'Next.js로 만드는 실무 웹앱',
      price: 72000,
      name: '박넥스트',
      coverImageUrl: 'https://picsum.photos/seed/course3/400/300',
      category: {
        id: 7,
        name: '프론트엔드',
        parent: {
          id: 1,
          name: '개발·프로그래밍',
        },
      },
    },
  ],
};

export const MOCK_COURSE_DETAIL: CourseDetailResponse = {
  courseId: 3,
  title: 'React + TypeScript로 만드는 LXP 실전',
  summary: '실무형 React/TS 패턴으로 강의 상세/목록 UI를 빠르게 완성합니다.',
  description:
    '이 강의에서는 Next.js(App Router) 기반으로 강의 목록/상세 UI를 구현하며, 컴포넌트 분리, 탭 UI, 커리큘럼 렌더링, 상태 관리 흐름을 실습합니다.\n\n- 강의 상세 레이아웃 구성\n- 탭(소개/커리큘럼/후기/문의) UI\n- 커리큘럼(챕터/레슨) 데이터 렌더링\n- 장바구니/결제 버튼 플로우(추후 API 연동)',
  price: 99000,
  accessDays: 30,
  categoryDetail: {
    categoryId: 1,
    name: '개발·프로그래밍',
    subCategoryDetailDto: {
      subCategoryId: 7,
      name: '프론트엔드',
    },
  },
  instructorName: '고로고로 강사',
  instructorId: 1001,
  coverImageUrl:
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  difficulty: 'INTERMEDIATE',
  chapters: [
    {
      chapterId: 1,
      title: 'OT & 환경 세팅',
      lessons: [
        { lessonId: 1232398472, title: '강의 소개', resourceUrl: 'https://example.com/lesson/1' },
        {
          lessonId: 2,
          title: '프로젝트 구조 살펴보기',
          resourceUrl: 'https://example.com/lesson/2',
        },
      ],
    },
    {
      chapterId: 2,
      title: '강의 상세 페이지 UI 구현',
      lessons: [
        { lessonId: 3, title: '상세 레이아웃 만들기', resourceUrl: 'https://example.com/lesson/3' },
        { lessonId: 4, title: '탭 컴포넌트 구성하기', resourceUrl: 'https://example.com/lesson/4' },
      ],
    },
    {
      chapterId: 3,
      title: '커리큘럼 렌더링',
      lessons: [
        {
          lessonId: 5,
          title: '챕터/레슨 리스트 렌더링',
          resourceUrl: 'https://example.com/lesson/5',
        },
      ],
    },
  ],
};
export const MOCK_REVIEWS: ReviewListResponse = {
  reviews: [
    {
      reviewId: 1,
      userNickname: '김지민',
      userId: 1001,
      courseId: 12314,
      title: '정말 도움돼요',
      comment: '설명이 깔끔하고 예제 흐름이 좋아서 따라가기 편했어요!',
      rating: 5,
      createdAt: '2026-01-06T00:00:00.000Z',
    },
    {
      reviewId: 2,
      userNickname: '이서연',
      userId: 13,
      courseId: 12342314,
      title: '실무에 도움 됨',
      comment: '커리큘럼 구성도 좋고 UI 구현 팁이 실무에 도움 됐습니다.',
      rating: 4,
      createdAt: '2026-01-07T00:00:00.000Z',
    },
    {
      reviewId: 3,
      userNickname: '박도현',
      userId: 128,
      courseId: 314,
      title: '다음 강의도 기대',
      comment: '탭/사이드바 구성 아이디어 얻었어요. 다음 강의도 기대!',
      rating: 5,
      createdAt: '2026-01-08T00:00:00.000Z',
    },
  ],
};
//루트 퀘스천(lesson 단위 qna 리스트)
//GET `/api/courses/{courseId}/lessons/{lessonId}/qna` 응답
// getLessonQna(courseId, lessonId)
export const MOCK_LESSON_QNA_LIST: LessonQnaListResponse = {
  questions: [
    {
      questionId: 23421234, // 고유값
      courseId: 101,
      lessonId: 1232398472, //순서보장 아님
      title: '강의 난이도는 어느 정도인가요?',
      authorId: 42, //학생
      authorNickname: '장권영',
      status: 'ANSWERED',
      replyCount: 2,
      lastActivityAt: '2026-01-05T05:10:00.000Z',
    },
    {
      questionId: 79892342, // 고유값
      courseId: 101,
      lessonId: 1232398472, //순서보장 아님
      title: '수강 기간 연장도 되나요?',
      authorId: 43, //학생
      authorNickname: '안윤선',
      status: 'ANSWERED',
      replyCount: 2,
      lastActivityAt: '2026-01-07T11:40:00.000Z',
    },
    {
      questionId: 13847250, // 고유값
      courseId: 101,
      lessonId: 1232398472, //순서보장 아님
      title: '커리큘럼에 실습 코드 제공되나요?',
      authorId: 44, //학생
      authorNickname: '정승일',
      status: 'OPENED',
      replyCount: 0,
      lastActivityAt: '2026-01-08T03:30:00.000Z',
    },
  ],
};
// export const MOCK_QNA_THREAD: QnaThreadResponse = {
//   threadId: '550e8400-e29b-41d4-a716-446655440000',
//   courseId: 101,
//   lessonId: 1232398472,
//   instructorId: 1001, // ( 선생님이 답변 안달았으면 : null )
//   status: 'ANSWERED',
//   lastActivityAt: '2026-01-05T05:10:00.000Z',
//   questions: [
//     {
//       questionId: 23421234,
//       isRoot: true,
//       title: '리액트 난이도 어떤가요?',
//       content: '리액트 한번 수강해봤어요. 훅 다룰줄 몰라요.',
//       authorId: 42, //학생(질문): 루트
//       authorNickname: '장권영',
//       createdAt: '2026-01-05T02:20:00.000Z',
//     },
//     {
//       questionId: 999999,
//       isRoot: false,
//       title: null,
//       content: '생각보다 안어려워요.',
//       authorId: 1001, //선생님(답변)
//       authorNickname: '강보람 강사',
//       createdAt: '2026-01-05T02:20:00.000Z',
//     },
//     {
//       questionId: 8888888,
//       isRoot: false,
//       title: null,
//       content: '답변 감사합니다.',
//       authorId: 1003, //학생(답변)
//       authorNickname: '장권영',
//       createdAt: '2026-01-05T05:10:00.000Z',
//     },
//   ],
// };
// 목데이터를 ID별로 매핑
export const MOCK_QNA_THREAD: Record<number, QnaThreadResponse> = {
  23421234: {
    threadId: 'thread-1',
    courseId: 101,
    lessonId: 1232398472,
    instructorId: 1001,
    status: 'ANSWERED',
    lastActivityAt: '2026-01-03',
    questions: [
      {
        questionId: 23421234,
        isRoot: true,
        title: '난이도 문의',
        content: '리액트 난이도 어떤가요?',
        authorId: 42,
        authorNickname: '장권영',
        createdAt: '2026-01-02',
      },
      {
        questionId: 999999,
        isRoot: false,
        title: null,
        content: '안 어려워요!',
        authorId: 1001,
        authorNickname: '강보람 강사',
        createdAt: '2026-01-03',
      },
    ],
  },
  79892342: {
    threadId: 'thread-2',
    courseId: 101,
    lessonId: 1232398472,
    instructorId: 1020,
    status: 'ANSWERED',
    lastActivityAt: '2026-12-03',
    questions: [
      {
        questionId: 79892342,
        isRoot: true,
        title: '연장 문의',
        content: '수강 기간 연장 되나요?',
        authorId: 50,
        authorNickname: '안윤선',
        createdAt: '2025-12-01',
      },
      {
        questionId: 111111,
        isRoot: false,
        title: null,
        content: '네, 가능합니다.',
        authorId: 1020,
        authorNickname: '강보람 강사',
        createdAt: '2025-12-02',
      },
      {
        questionId: 33333,
        isRoot: false,
        title: '연장 문의',
        content: '답변감사합니다!!!',
        authorId: 50,
        authorNickname: '안윤선',
        createdAt: '2025-12-03',
      },
    ],
  },
  // ... 나머지 ID들도 추가
};
