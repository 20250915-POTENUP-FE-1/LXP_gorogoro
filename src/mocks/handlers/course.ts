import { http, HttpResponse, delay } from 'msw';
import {
  CoursesResponse,
  CourseDetailResponse,
  ReviewListResponse,
  LessonQnaListResponse,
  QnaThreadResponse,
  UnansweredQnaResponse,
  EnrollResponse,
} from '@/features/courses/types';

const REQUEST_DELAY = 400;

export const courseHandlers = [
  // 강좌 목록 조회 (GET /api/courses)
  http.get('**/api/courses', async ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
    await delay(REQUEST_DELAY);

    const allCourses: CoursesResponse = {
      contents: [
        {
          courseId: 1,
          title: 'Next.js 15 App Router 완벽 가이드',
          price: 55000,
          name: 'Gemini 시니어',
          coverImageUrl: 'https://picsum.photos/seed/nextjs/400/250',
          category: {
            id: 7,
            name: '프론트엔드',
            parent: { id: 1, name: '개발·프로그래밍' },
          },
        },
        {
          courseId: 2,
          title: 'TypeScript 핵심 아키텍처 설계',
          price: 44000,
          name: 'Gemini 시니어',
          coverImageUrl: 'https://picsum.photos/seed/ts/400/250',
          category: {
            id: 8,
            name: '백엔드',
            parent: { id: 1, name: '개발·프로그래밍' },
          },
        },
      ],
    };

    // 카테고리 필터링
    if (categoryId) {
      allCourses.contents = allCourses.contents.filter((c) => c.category.id === Number(categoryId));
    }

    return HttpResponse.json(allCourses);
  }),

  // 강좌 상세 조회 (GET /api/courses/:courseId)
  http.get('***/api/courses/:courseId', async ({ params }) => {
    const { courseId } = params;
    await delay(REQUEST_DELAY);

    const detail: CourseDetailResponse = {
      courseId: Number(courseId),
      title: 'Next.js 15 App Router 완벽 가이드',
      summary: '최신 Next.js 기능을 마스터합니다.',
      description: '<p>이 강좌는 실무 중심의 Next.js 강좌입니다.</p>',
      price: 55000,
      accessDays: 365,
      instructorName: 'Gemini 시니어',
      instructorId: 8,
      coverImageUrl: 'https://picsum.photos/seed/nextjs/800/450',
      difficulty: 'INTERMEDIATE',
      categoryDetail: {
        categoryId: 1,
        name: '개발·프로그래밍',
        subCategoryDetailDto: { subCategoryId: 7, name: '프론트엔드' },
      },
      chapters: [
        {
          chapterId: 101,
          title: '섹션 1. 환경 설정',
          lessons: [
            { lessonId: 1001, title: '강의 소개', resourceUrl: 'https://video-url.com/1' },
            { lessonId: 1002, title: '설치 및 초기화', resourceUrl: 'https://video-url.com/2' },
          ],
        },
      ],
    };

    return HttpResponse.json(detail);
  }),

  // 리뷰 조회 (GET /api/courses/:courseId/reviews)
  http.get('**/api/courses/:courseId/reviews', async () => {
    const reviews: ReviewListResponse = {
      reviews: [
        {
          reviewId: 501,
          courseId: 1,
          userId: 10,
          userNickname: '열공냥이',
          title: '정말 도움이 많이 됐어요!',
          comment: '설명이 아주 명쾌합니다.',
          rating: 5,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    return HttpResponse.json(reviews);
  }),

  // QnA 목록 조회 (GET /api/courses/:courseId/lessons/:lessonId/qna)
  http.get('**/api/courses/:courseId/lessons/:lessonId/qna', async () => {
    const qnaList: LessonQnaListResponse = {
      questions: [
        {
          questionId: 901,
          courseId: 1,
          lessonId: 1001,
          title: '서버 컴포넌트에서 에러가 납니다.',
          authorId: 10,
          authorNickname: '열공냥이',
          status: 'ANSWERED',
          replyCount: 1,
          lastActivityAt: new Date().toISOString(),
        },
      ],
    };
    return HttpResponse.json(qnaList);
  }),

  // QnA 스레드 상세 조회 (GET .../qna/:questionId/thread)
  http.get('**/api/courses/:courseId/lessons/:lessonId/qna/:questionId/thread', async () => {
    const thread: QnaThreadResponse = {
      threadId: 'uuid-1234-5678',
      courseId: 1,
      lessonId: 1001,
      instructorId: 8,
      status: 'ANSWERED',
      lastActivityAt: new Date().toISOString(),
      questions: [
        {
          questionId: 901,
          isRoot: true,
          title: '서버 컴포넌트에서 에러가 납니다.',
          content: '어떤 부분이 문제일까요?',
          authorId: 10,
          authorNickname: '열공냥이',
          createdAt: new Date().toISOString(),
        },
        {
          questionId: 902,
          isRoot: false,
          title: null,
          content: '해당 코드를 공유해주시겠어요?',
          authorId: 8,
          authorNickname: 'Gemini 시니어',
          createdAt: new Date().toISOString(),
        },
      ],
    };
    return HttpResponse.json(thread);
  }),

  // [강사] 미답변 질문 조회 (GET /api/qna/instructors/unanswered)
  http.get('**/api/qna/instructors/unanswered', async () => {
    const unanswered: UnansweredQnaResponse = {
      questions: [
        {
          questionId: 999,
          courseId: 1,
          lessonId: 1002,
          title: '질문 있습니다!',
          authorId: 20,
          lastActivityAt: new Date().toISOString(),
        },
      ],
    };
    return HttpResponse.json(unanswered);
  }),

  // 내 수강 목록 조회 (GET /api/enrollments)
  http.get('**/api/enrollments', async () => {
    const enrollment: EnrollResponse = {
      contents: [
        {
          courseId: 1,
          courseTitle: 'Next.js 15 App Router 완벽 가이드',
          instructorName: 'Gemini 시니어',
          coverImage: 'https://picsum.photos/seed/nextjs/400/250',
        },
      ],
    };
    return HttpResponse.json(enrollment);
  }),

  // 수강 신청 (POST /api/enrollments)
  http.post('**/api/enrollments', async () => new HttpResponse(null, { status: 201 })),

  // 리뷰 생성 (POST /api/courses/:courseId/reviews)
  http.post(
    '**/api/courses/:courseId/reviews',
    async () => new HttpResponse(null, { status: 201 }),
  ),

  // QnA 질문 생성 (POST /api/courses/:courseId/lessons/:lessonId/qna)
  http.post(
    '**/api/courses/:courseId/lessons/:lessonId/qna',
    async () => new HttpResponse(null, { status: 201 }),
  ),

  // [강사] 강좌 삭제 (DELETE /api/courses/:courseId)
  http.delete('**/api/courses/:courseId', async () => new HttpResponse(null, { status: 204 })),
];
