import { useState } from "react";
import "./CategoryBar.css";

function CategoryBar({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
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
