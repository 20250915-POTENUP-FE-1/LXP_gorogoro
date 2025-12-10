"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./CategoryBar.module.css";

export default function CategoryBar({ subCategories }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // 현재 쿼리 파라미터를 복사하여 새로운 객체 생성
  const params = new URLSearchParams(searchParams?.toString());

  const currentCategory = params.get("categoryId") || "";

  const handleCategoryClick = (categoryId: string) => {
    params.set("categoryId", categoryId);
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
    <section className={styles.bar} aria-label="카테고리 및 정렬">
      <div className={styles.inner}>
        <div className={styles.chipGroup} role="tablist">
          {subCategories.length > 0 && (
            <button
              className={`${styles.chip} ${
                currentCategory == subCategories[0].parentId
                  ? styles.chipActive
                  : ""
              }`}
              type="button"
              onClick={() => handleCategoryClick(subCategories[0].parentId)}
            >
              전체
            </button>
          )}
          {subCategories.map((category: { id: string; name: string }) => (
            <button
              key={category.id}
              className={`${styles.chip} ${
                currentCategory == category.id ? styles.chipActive : ""
              }`}
              type="button"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.search}>
          <label className={styles.searchField}>
            <img
              className={styles.searchIcon}
              src="/assets/search.svg"
              alt=""
              aria-hidden="true"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="검색"
              aria-label="검색어 입력"
              onChange={handleSearchChange}
            />
          </label>
        </div>
        <div className={styles.select}>
          <label className={styles.selectField}>
            <select className={styles.dropdown} onChange={handleSortChange}>
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
