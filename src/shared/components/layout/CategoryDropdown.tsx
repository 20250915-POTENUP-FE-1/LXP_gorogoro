"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/features/courses/types";
import styles from "./Header.module.css";

interface CategoryDropdownProps {
  categories: Category[];
}

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  const [isFirstOpen, setIsFirstOpen] = useState(false);

  return (
    <div
      className={styles.categoryDropdown}
      onMouseEnter={() => setIsFirstOpen(true)}
      onMouseLeave={() => setIsFirstOpen(false)}
    >
      <button className={styles.categoryButton}>
        카테고리 {isFirstOpen ? "↑" : "↓"}
      </button>

      {isFirstOpen && (
        <div className={styles.dropdownMenu}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryGroup}>
              <Link
                href={`/courses?categoryId=${category.id}`}
                onClick={() => setIsFirstOpen(false)}
                className={styles.categoryLink}
              >
                {category.name}
              </Link>

              {category.subCategories && category.subCategories.length > 0 && (
                <div className={styles.subCategoryList}>
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      href={`/courses?categoryId=${subCategory.id}`}
                      onClick={() => setIsFirstOpen(false)}
                      className={styles.subCategoryLink}
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
