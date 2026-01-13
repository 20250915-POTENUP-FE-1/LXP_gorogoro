import {
  CourseDetailResponse,
  CoursesResponse,
  Qna,
  Reviews,
  CourseLearnPageModel,
} from '@/features/courses/types';

export const MOCK_COURSES: CoursesResponse = {
  contents: [
    {
      courseId: 1,
      title: '리액트 기초부터 실전까지',
      price: 55000,
      name: '김프론트',
      coverImageUrl: 'https://picsum.photos/seed/course1/400/300',
    },
    {
      courseId: 2,
      title: '타입스크립트 완전 정복',
      price: 60000,
      name: '이타입',
      coverImageUrl: 'https://picsum.photos/seed/course2/400/300',
    },
    {
      courseId: 3,
      title: 'Next.js로 만드는 실무 웹앱',
      price: 72000,
      name: '박넥스트',
      coverImageUrl: 'https://picsum.photos/seed/course3/400/300',
    },
  ],
};
export const MOCK_COURSE_DETAIL: CourseDetailResponse & Reviews & Qna = {
  courseId: 3,
  title: 'React + TypeScript로 만드는 LXP 실전',
  summary: '실무형 React/TS 패턴으로 강의 상세/목록 UI를 빠르게 완성합니다.',
  description:
    '이 강의에서는 Next.js(App Router) 기반으로 강의 목록/상세 UI를 구현하며, 컴포넌트 분리, 탭 UI, 커리큘럼 렌더링, 상태 관리 흐름을 실습합니다.\n\n- 강의 상세 레이아웃 구성\n- 탭(소개/커리큘럼/후기/문의) UI\n- 커리큘럼(챕터/레슨) 데이터 렌더링\n- 장바구니/결제 버튼 플로우(추후 API 연동)',
  price: 99000,
  accessDays: 30,
  categoryDetail: {
    categoryId: 1,
    name: '개발・프로그래밍',
    subCategoryDetailDto: {
      subCategoryId: 11,
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
        {
          lessonId: 1,
          title: '강의 소개',
          resourceUrl: 'https://example.com/lesson/1',
        },
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
        {
          lessonId: 1,
          title: '상세 레이아웃 만들기',
          resourceUrl: 'https://example.com/lesson/3',
        },
        {
          lessonId: 2,
          title: '탭 컴포넌트 구성하기',
          resourceUrl: 'https://example.com/lesson/4',
        },
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
  reviews: [
    {
      id: 1,
      userName: '김지민',
      rating: 5,
      createdAt: '2026-01-06',
      content: '설명이 깔끔하고 예제 흐름이 좋아서 따라가기 편했어요!',
    },
    {
      id: 2,
      userName: '이서연',
      rating: 4,
      createdAt: '2026-01-07',
      content: '커리큘럼 구성도 좋고 UI 구현 팁이 실무에 도움 됐습니다.',
    },
    {
      id: 3,
      userName: '박도현',
      rating: 5,
      createdAt: '2026-01-08',
      content: '탭/사이드바 구성 아이디어 얻었어요. 다음 강의도 기대!',
    },
  ],
  qna: [
    {
      id: 101,
      lessonId: 1, // OT & 환경 세팅 > 강의 소개
      lessonTitle: '강의 소개',
      title: '강의 난이도는 어느 정도인가요?',
      status: 'answered',
      author: {
        name: '박서현',
        role: 'student',
      },
      createdAt: '2026-01-05T02:20:00.000Z',
      content: 'React는 조금 해봤는데 TypeScript가 처음이에요. 따라갈 수 있을까요?',
      replies: [
        {
          id: 1,
          content:
            '네 가능합니다! 초반에 TS 기초 문법부터 차근차근 설명하고, 실습은 단계별로 진행합니다.',
          author: {
            name: '고로고로 강사',
            role: 'instructor',
          },
          createdAt: '2026-01-05T05:10:00.000Z',
        },
      ],
      readCount: 15,
    },
    {
      id: 102,
      lessonId: 1,
      lessonTitle: '강의 소개',
      title: '수강 기간 연장도 되나요?',
      status: 'pending',
      author: {
        name: '김도윤',
        role: 'student',
      },
      createdAt: '2026-01-07T11:40:00.000Z',
      content: 'accessDays 끝나면 자동으로 종료되는지, 연장 구매가 가능한지 궁금해요.',
      replies: [],
      readCount: 8,
    },
    {
      id: 103,
      lessonId: 3, // 강의 상세 페이지 UI 구현 > 상세 레이아웃 만들기
      lessonTitle: '상세 레이아웃 만들기',
      title: '커리큘럼에 실습 코드 제공되나요?',
      status: 'answered',
      author: {
        name: '이하린',
        role: 'student',
      },
      createdAt: '2026-01-08T01:05:00.000Z',
      content: '실습마다 브랜치로 제공되는지, zip 다운로드 형태인지 궁금합니다.',
      replies: [
        {
          id: 2,
          content: '실습은 챕터별 브랜치로 제공하고, 강의 자료에 GitHub 링크도 함께 안내드려요.',
          author: {
            name: '고로고로 강사',
            role: 'instructor',
          },
          createdAt: '2026-01-08T03:15:00.000Z',
        },
        {
          id: 3,
          content: '감사합니다! 바로 수강신청 할게요.',
          author: {
            name: '이하린',
            role: 'student',
          },
          createdAt: '2026-01-08T03:30:00.000Z',
        },
      ],
      readCount: 24,
    },
  ],
};
export const MOCK_COURSE_LEARN: CourseLearnPageModel = {
  courseId: 101,
  title: '마이크로서비스 아키텍처 기초',
  summary: '모놀리식에서 MSA로 넘어가기 위한 핵심 개념을 학습합니다.',
  description:
    '마이크로서비스의 기본 개념부터 통신 패턴, 데이터 일관성까지 실무 관점으로 설명합니다.',
  price: 99000,
  accessDays: 30,
  coverImageUrl:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop',
  difficulty: 'BEGINNER',
  instructorName: '김성훈',
  instructorId: 7,
  categoryDetail: {
    categoryId: 1,
    name: '개발·프로그래밍',
    subCategoryDetailDto: {
      subCategoryId: 11,
      name: '백엔드',
    },
  },

  chapters: [
    {
      chapterId: 1,
      title: 'Foundation of Microservices',
      lessons: [
        {
          lessonId: 1001,
          title: 'Why Microservices?',
          resourceUrl: 'https://example.com/video/1001',
        },
        {
          lessonId: 1002,
          title: 'Bounded Context 이해',
          resourceUrl: 'https://example.com/video/1002',
        },
      ],
    },
    {
      chapterId: 2,
      title: 'Communication Patterns',
      lessons: [
        {
          lessonId: 2001,
          title: 'Sync vs Async',
          resourceUrl: 'https://example.com/video/2001',
        },
        {
          lessonId: 2002,
          title: 'API Gateway 패턴',
          resourceUrl: 'https://example.com/video/2002',
        },
      ],
    },
  ],

  // learn 전용
  progress: 35,
  activeLessonId: 1001,
  activeLesson: {
    lessonId: 1001,
    title: 'Why Microservices?',
    resourceUrl: 'https://example.com/video/1001',
  },

  // lesson QnA: ThreadDto가 lessonId/lessonTitle을 들고 있으니 연결이 쉬움
  qna: [
    {
      id: 1,
      lessonId: 1001,
      lessonTitle: 'Why Microservices?',
      title: '모놀리식과 MSA의 가장 큰 차이는 뭔가요?',
      content: '개념적으로는 알겠는데 실무에서 어떤 점이 제일 달라요?',
      status: 'answered',
      author: {
        name: '박학생',
        role: 'student',
      },
      createdAt: '2026-01-10T10:15:00.000Z',
      replies: [
        {
          id: 11,
          content:
            '배포 단위와 장애 전파 범위가 가장 크게 달라집니다. 팀/도메인 분리 관점도 함께 보시면 좋아요.',
          author: {
            name: '김성훈',
            role: 'instructor',
          },
          createdAt: '2026-01-10T11:00:00.000Z',
        },
      ],
      readCount: 12,
    },
    {
      id: 2,
      lessonId: 1001,
      lessonTitle: 'Why Microservices?',
      title: 'MSA는 무조건 좋은 선택인가요?',
      content: '규모가 작아도 도입할 가치가 있나요?',
      status: 'pending',
      author: {
        name: '최학습',
        role: 'student',
      },
      createdAt: '2026-01-11T09:20:00.000Z',
      replies: [],
      readCount: 5,
    },
  ],
};
