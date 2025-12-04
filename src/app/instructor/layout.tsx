import InstructorSidebar from "@/features/intructor/components/InstructorSidebar";
import "./InstructorLayout.css";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="instructor-layout">
      <div className="instructor-layout__content">
        <InstructorSidebar />
        {children}
      </div>
    </main>
  );
}
