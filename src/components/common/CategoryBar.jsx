import "./CategoryBar.css";

function CategoryBar() {
  return (
    <section className="category-bar" aria-label="카테고리 및 정렬">
      <div className="category-bar__inner">
        <div className="category-bar__chip-group" role="tablist">
          <button
            className="category-bar__chip category-bar__chip--active"
            type="button"
          >
            전체
          </button>
          <button className="category-bar__chip" type="button">
            코딩 기초
          </button>
          <button className="category-bar__chip" type="button">
            데이터 분석
          </button>
          <button className="category-bar__chip" type="button">
            생성형 AI
          </button>
          <button className="category-bar__chip" type="button">
            웹 개발
          </button>
        </div>
        <div className="category-bar__divider" aria-hidden="true" />
        <div className="category-bar__search">
          <label className="category-bar__search-field">
            {/* <span className="material-symbols-outlined category-bar__search-icon">
              search
            </span> */}
            <input
              className="category-bar__input"
              type="text"
              placeholder="검색"
            />
          </label>
        </div>
        <div className="category-bar__select">
          <label className="category-bar__select-field">
            <select className="category-bar__dropdown" defaultValue="최신순">
              <option>최신순</option>
              <option>인기순</option>
              <option>가격순</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

export default CategoryBar;
