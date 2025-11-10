import { useState } from "react";
import "./CategoryBar.css";

function CategoryBar({ categories, onFilterChange }) {
  // active 클래스를 추가하기 위한 지역 상태 변수 추가
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onFilterChange({ category: categoryId });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value });
  };

  return (
    <section className="category-bar" aria-label="카테고리 및 정렬">
      <div className="category-bar__inner">
        <div className="category-bar__chip-group" role="tablist">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-bar__chip ${
                selectedCategory === category.id
                  ? "category-bar__chip--active"
                  : ""
              }`}
              type="button"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="category-bar__divider" aria-hidden="true" />
        <div className="category-bar__search">
          <label className="category-bar__search-field">
            <img
              className="category-bar__search-icon"
              src="/assets/icons/search.svg"
              alt=""
              aria-hidden="true"
            />
            <input
              className="category-bar__input"
              type="text"
              placeholder="검색"
              aria-label="검색어 입력"
              onChange={handleSearchChange}
            />
          </label>
        </div>
        <div className="category-bar__select">
          <label className="category-bar__select-field">
            <select
              className="category-bar__dropdown"
              onChange={handleSortChange}
            >
              <option value="latest">최신순</option>
              <option value="priceAsc">낮은 가격순</option>
              <option value="priceDesc">높은 가격순</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

export default CategoryBar;
