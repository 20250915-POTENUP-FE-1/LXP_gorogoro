import {
  CourseDetailResponse,
  CoursesResponse,
  LessonQnaListResponse,
  ReviewsResponse,
  QnaThreadResponse,
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
  difficulty: 'BEGINNER',
  chapters: [
    {
      chapterId: 1,
      title: 'OT & 환경 세팅',
      lessons: [
        { lessonId: 1, title: '강의 소개', resourceUrl: 'https://example.com/lesson/1' },
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
        { lessonId: 1, title: '상세 레이아웃 만들기', resourceUrl: 'https://example.com/lesson/3' },
        { lessonId: 2, title: '탭 컴포넌트 구성하기', resourceUrl: 'https://example.com/lesson/4' },
      ],
    },
    {
      chapterId: 3,
      title: '커리큘럼 렌더링',
      lessons: [
        {
          lessonId: 1,
          title: '챕터/레슨 리스트 렌더링',
          resourceUrl: 'https://example.com/lesson/5',
        },
      ],
    },
  ],
};
export const MOCK_REVIEWS: ReviewsResponse[] = [
  {
    authorName: '김지민',
    title: '정말 도움돼요',
    comment: '설명이 깔끔하고 예제 흐름이 좋아서 따라가기 편했어요!',
    stars: 5,
    createdAt: '2026-01-06T00:00:00.000Z',
  },
  {
    authorName: '이서연',
    title: '실무에 도움 됨',
    comment: '커리큘럼 구성도 좋고 UI 구현 팁이 실무에 도움 됐습니다.',
    stars: 4,
    createdAt: '2026-01-07T00:00:00.000Z',
  },
  {
    authorName: '박도현',
    title: '다음 강의도 기대',
    comment: '탭/사이드바 구성 아이디어 얻었어요. 다음 강의도 기대!',
    stars: 5,
    createdAt: '2026-01-08T00:00:00.000Z',
  },
];
export const MOCK_LESSON_QNA_LIST: LessonQnaListResponse = {
  questions: [
    {
      questionId: 1,
      courseId: 3,
      lessonId: 1,
      title: '강의 난이도는 어느 정도인가요?',
      authorId: 42,
      status: 'ANSWERED',
      replyCount: 1,
      lastActivityAt: '2026-01-05T05:10:00.000Z',
    },
    {
      questionId: 2,
      courseId: 3,
      lessonId: 1,
      title: '수강 기간 연장도 되나요?',
      authorId: 43,
      status: 'OPENED',
      replyCount: 0,
      lastActivityAt: '2026-01-07T11:40:00.000Z',
    },
    {
      questionId: 3,
      courseId: 3,
      lessonId: 3,
      title: '커리큘럼에 실습 코드 제공되나요?',
      authorId: 44,
      status: 'ANSWERED',
      replyCount: 2,
      lastActivityAt: '2026-01-08T03:30:00.000Z',
    },
  ],
};
export const MOCK_QNA_THREAD: QnaThreadResponse = {
  threadId: '550e8400-e29b-41d4-a716-446655440000',
  courseId: 3,
  lessonId: 1,
  instructorId: 1001,
  status: 'ANSWERED',
  lastActivityAt: '2026-01-05T05:10:00.000Z',
  questions: [
    {
      questionId: 1,
      isRoot: true,
      title: '강의 난이도는 어느 정도인가요?',
      content: 'React는 조금 해봤는데 TypeScript가 처음이에요. 따라갈 수 있을까요?',
      authorId: 42,
      createdAt: '2026-01-05T02:20:00.000Z',
    },
    {
      questionId: 10,
      isRoot: false,
      title: null,
      content:
        '네 가능합니다! 초반에 TS 기초 문법부터 차근차근 설명하고, 실습은 단계별로 진행합니다.',
      authorId: 1001,
      createdAt: '2026-01-05T05:10:00.000Z',
    },
  ],
};
