import { NavLink } from "react-router-dom";
import "./Header.css";

import cartIconUrl from "/assets/icons/shopping-cart.svg";
import userIconUrl from "/assets/icons/user.svg";
import { useSelector } from "react-redux";

function Header() {
  const userProfile = useSelector((state) => state.auth.userProfile);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand-group">
          <NavLink to="/" className="header__brand">
            GORO
          </NavLink>
          {userProfile ? (
            <div>{userProfile.displayName}님, 안녕하세요!</div>
          ) : (
            <div>로그인을 해보세요</div>
          )}
        </div>
        {userProfile ? (
          <div className="header__actions">
            {userProfile.role === "instructor" && (
              <NavLink to="/instructor" className="header__dashboard-link">
                강사 대시보드
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className="header__action-button"
              aria-label="장바구니"
            >
              <img
                src={cartIconUrl}
                alt=""
                className="header__action-icon"
                aria-hidden="true"
              />
            </NavLink>
            <NavLink
              to="/mypage"
              className="header__action-button"
              aria-label="마이페이지"
            >
              <img src={userIconUrl} alt="" className="header__action-icon" />
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login" className="header__dashboard-link">
            로그인 하기
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
