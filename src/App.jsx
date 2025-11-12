import "./styles/global.css";
import Header from "./components/layout/Header";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import CoursePage from "./pages/course/CoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";
import CartPage from "./pages/cart/CartPage";
import MyPage from "./pages/student/MyPage";
import EnrollmentList from "./components/student/EnrollmentList";
import InstructorPage from "./pages/instructor/InstructorPage";
import InstructorCourseList from "./components/instructor/InstructorCourseList";
import CourseEditContainer from "./components/instructor/CourseEditContainer";
import CourseCreateContatiner from "./components/instructor/CourseCreateContainer";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "./services/userService";

function App() {
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userProfile = await getUserProfile(currentUser.uid);
        setCurrentUserProfile(userProfile);
      } else {
        setCurrentUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(currentUserProfile);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<CoursePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<EnrollmentList />} />
          <Route path="enrollments" element={<EnrollmentList />} />
        </Route>
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
