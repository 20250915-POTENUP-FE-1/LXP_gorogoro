import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'LXP GoroGoro',
    template: '%s | LXP GoroGoro',
  },
  description: '강의 탐색부터 수강, 강사 운영까지 한 번에 관리하는 학습 플랫폼.',
};

export default function Home() {
  redirect('/courses');
}
