import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand-group">
          <a className="header__brand" href="#">
            GOROGORO
          </a>
          <nav className="header__nav" aria-label="메인 메뉴">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  강좌
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  챌린지
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  멘토링
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  커뮤니티
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__actions">
          <a className="header__dashboard-link" href="#">
            강사 대시보드 가기
          </a>
          <button
            className="header__action-button"
            type="button"
            aria-label="장바구니"
          >
            <span className="material-symbols-outlined header__action-icon">
              shopping_cart
            </span>
          </button>
          <button
            className="header__action-button"
            type="button"
            aria-label="내 계정"
          >
            <span className="material-symbols-outlined header__action-icon">
              person
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
