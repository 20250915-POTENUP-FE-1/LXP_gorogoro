import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, requiredRole, userLoading }) {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const location = useLocation();

  // 0. 인증 상태 로딩 중일 때
  if (userLoading) {
    return <div>사용자 정보 확인 중...</div>;
  }

  const isAuthenticated = !!userProfile;

  // requiredRole이 있으면 역할을 비교하고, 없으면 역할 검사는 무조건 통과(true)시킴
  const hasRequiredRole = requiredRole
    ? userProfile?.role === requiredRole
    : true;

  // 1. 로그인하지 않은 사용자일 경우
  if (!isAuthenticated) {
    // 사용자를 로그인 페이지로 리다이렉트
    // state: 로그인 후 원래 가려던 페이지로 다시 돌아오게 하기 위함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 로그인은 했지만, 역할이 맞지 않는 사용자일 경우
  if (!hasRequiredRole) {
    // alert는 useEffect 내에서 호출하여 렌더링 중 사이드 이펙트를 방지합니다.
    useEffect(() => {
      alert("접근 권한이 없습니다.");
    }, []);

    // 홈으로 리다이렉트
    return <Navigate to="/" replace />;
  }

  // 3. 모든 조건을 만족하는 사용자
  return children;
}

export default PrivateRoute;
