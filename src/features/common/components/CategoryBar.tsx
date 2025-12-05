"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./CategoryBar.css";

export default function CategoryBar({ categories }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // 현재 쿼리 파라미터를 복사하여 새로운 객체 생성
  const params = new URLSearchParams(searchParams.toString());

  const currentCategory = params.get("category") || "";

  const handleCategoryClick = (categoryId: string) => {
    params.set("category", categoryId);
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    params.set("search", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set("sort", e.target.value);
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="category-bar" aria-label="카테고리 및 정렬">
      <div className="category-bar__inner">
        <div className="category-bar__chip-group" role="tablist">
          {categories.map((category: { id: string; name: string }) => (
            <button
              key={category.id}
              className={`category-bar__chip ${
                currentCategory === category.id
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
              src="/assets/search.svg"
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
