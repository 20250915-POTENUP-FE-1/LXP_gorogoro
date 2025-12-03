import MySidebar from "@/features/mypage/components/MySidebar";
import "./MyPage.css";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="my-page">
      <div className="page-wrapper my-page__container">
        <MySidebar />
        {children}
      </div>
    </main>
  );
}
