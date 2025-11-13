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
import PrivateRoute from "./components/auth/PrivateRoute";

import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { setUserProfile } from "./store/authSlice";
import { getUserProfile } from "./services/userService";

function App() {
  const dispatch = useDispatch();

  const [userLoading, setUserLoading] = useState(true); // 초기값을 true로 변경

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUserLoading(true);
      if (currentUser) {
        const result = await getUserProfile(currentUser.uid);
        dispatch(setUserProfile(result));
      } else {
        dispatch(setUserProfile(null));
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<CoursePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute userLoading={userLoading}>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/mypage/*"
          element={
            <PrivateRoute userLoading={userLoading}>
              <MyPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="enrollments" replace />} />
          <Route path="profile" element={<div>프로필 페이지</div>} />
          <Route path="enrollments" element={<EnrollmentList />} />
        </Route>

        <Route
          path="/instructor/*"
          element={
            <PrivateRoute userLoading={userLoading} requiredRole="instructor">
              <InstructorPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="courses" replace />} />
          <Route path="courses" element={<InstructorCourseList />} />
          <Route path="courses/:id/edit" element={<CourseEditContainer />} />
          <Route path="courses/create" element={<CourseCreateContatiner />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
