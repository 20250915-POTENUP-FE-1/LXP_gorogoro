import InstructorSidebar from "@/features/intructor/components/InstructorSidebar";
import "./InstructorPage.css";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="instructor-page">
      <div className="page-wrapper instructor-page__container">
        <InstructorSidebar />
        {children}
      </div>
    </main>
  );
}
