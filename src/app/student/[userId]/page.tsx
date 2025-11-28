import EnrollmentPage from "./enrollment/page";

export default async function MyPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // /student/useId 접근 시 기본으로 보여줄 화면이 "수강 중인 강좌" 화면일 때
  // 기존 App.jsx의 중첩 라우팅 참조...
  return <EnrollmentPage params={params} />;
}
