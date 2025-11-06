import { Routes, Route } from "react-router-dom";
import CoursePage from "./pages/course/CoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";
import CartPage from "./pages/cart/CartPage";
import Header from "./components/layout/Header";
import MyPage from "./pages/student/MyPage";

import InstructorPage from "./pages/instructor/InstructorPage";
import InstructorCourseList from "./components/instructor/InstructorCourseList";
import CourseEditContainer from "./components/instructor/CourseEditContainer";
import CourseCreateContatiner from "./components/instructor/CourseCreateContainer";

import "./styles/global.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<CoursePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/detail" element={<CourseDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/instructor" element={<InstructorPage />}>
          <Route index element={<InstructorCourseList />} />
          <Route path="courses" element={<InstructorCourseList />} />
          <Route path="courses/:id/edit" element={<CourseEditContainer />} />
          <Route path="courses/create" element={<CourseCreateContatiner />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
