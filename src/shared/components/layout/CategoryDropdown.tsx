"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/features/courses/types";

interface CategoryDropdownProps {
  categories: Category[];
}

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  const [isFirstOpen, setIsFirstOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setIsFirstOpen(true)}
      onMouseLeave={() => setIsFirstOpen(false)}
    >
      <button
        style={{
          padding: "8px",
          color: "black",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          background: "transparent",
        }}
      >
        카테고리 {isFirstOpen ? "↑" : "↓"}
      </button>

      {isFirstOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            // marginTop: "8px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            minWidth: "300px",
            maxHeight: "500px",
            overflowY: "auto",
            zIndex: 1000,
            // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {categories.map((category) => (
            <div key={category.id} style={{ padding: "8px" }}>
              <Link
                href={`/courses?categoryId=${category.id}`}
                onClick={() => setIsFirstOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  color: "#333",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {category.name}
              </Link>

              {category.subCategories && category.subCategories.length > 0 && (
                <div style={{ paddingLeft: "16px" }}>
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      href={`/courses?categoryId=${subCategory.id}`}
                      onClick={() => setIsFirstOpen(false)}
                      style={{
                        display: "block",
                        padding: "6px 12px",
                        color: "#666",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      → {subCategory.name}
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
