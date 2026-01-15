import { getQnaThread } from '@/services/course.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const courseId = searchParams.get('courseId');
  const lessonId = searchParams.get('lessonId');
  const questionId = searchParams.get('questionId');

  if (!courseId || !lessonId || !questionId) {
    return NextResponse.json(
      {
        status: 400,
        message: `courseId, lessonID, questionId 는 필수입니다.`,
      },
      {
        status: 400,
      },
    );
  }
  const cId = Number(courseId);
  const lId = Number(lessonId);
  const qId = Number(questionId);
  if (Number.isNaN(cId) || Number.isNaN(lId) || Number.isNaN(qId)) {
    return NextResponse.json(
      {
        status: 400,
        code: 'QNA-4001',
        message: 'courseId, lessonId, questionId는 숫자여야 합니다.',
      },
      { status: 400 },
    );
  }
  if (cId <= 0 || lId <= 0 || qId <= 0) {
    return NextResponse.json(
      {
        status: 400,
        code: 'QNA-4002',
        message: 'courseId, lessonId, questionId는 1 이상의 값이어야 합니다.',
      },
      { status: 400 },
    );
  }

  try {
    const data = await getQnaThread(cId, lId, qId);

    return NextResponse.json(data);
  } catch (err: any) {
    const status = typeof err.status === 'number' ? err.status : `500`;
    const body = {
      status,
      code: err.code,
      message: err.message,
    };
    return NextResponse.json(body, { status });
  }
}
