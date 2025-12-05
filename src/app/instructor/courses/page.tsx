import InstructorCourseList from "@/features/intructor/components/InstructorCourseList";

export default async function InstructorCoursePage() {
  //서비스 함수를 통해서 데이터 불러오는 작업 필요
  const courses = [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ];
  return <InstructorCourseList courses={courses} />;
}
