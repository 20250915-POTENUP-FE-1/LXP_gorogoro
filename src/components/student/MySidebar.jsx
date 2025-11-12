import "./MySidebar.css";

import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MySidebar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedin] = useState(true);

  console.log(auth.currentUser.uid);

  const checkAuthState = () => {
    // 리스너 함수: 인증 상태가 변경될 때마다 자동으로 되는 함수
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // 로그인이 됨
        // console.log("현재 로그인된 사용자", currentUser.uid);
        setIsLoggedin(true);
      } else {
        // 로그아웃이 됨
        console.log("로그인된 사용자가 없습니다.");
        setIsLoggedin(false);
      }
    });
  };

  checkAuthState();

  const logout = async () => {
    // 현재 로그인된 사용자 정보 (auth.currentUser)
    console.log("현재 로그인 되어있는 사용자 UID:", auth.currentUser);
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className="my-sidebar" aria-label="마이페이지 사이드바">
      <div className="my-sidebar__profile">
        <div className="my-sidebar__avatar"></div>
        <div className="my-sidebar__info">
          <span className="my-sidebar__name">조성훈</span>
          <span className="my-sidebar__email">user.email@example.com</span>
        </div>
      </div>
      <nav className="my-sidebar__nav" aria-label="마이페이지 메뉴">
        <button className="my-sidebar__nav-item" type="button">
          프로필
        </button>
        <button
          className="my-sidebar__nav-item my-sidebar__nav-item--active"
          type="button"
        >
          수강 중인 강좌
        </button>

        {isLoggedIn && (
          <button
            className="my-sidebar__nav-item my-sidebar__nav-item--logout"
            type="button"
            onClick={logout}
          >
            로그아웃
          </button>
        )}
      </nav>
    </aside>
  );
}

export default MySidebar;
