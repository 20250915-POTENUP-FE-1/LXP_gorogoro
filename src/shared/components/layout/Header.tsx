import Link from "next/link";
import styles from "@/shared/components/layout/Header.module.css";
import CategoryDropdown from "./CategoryDropdown";
import { getAllCategories } from "@/services/category.service";
import UserActions from "./UserActions";

export default async function Header() {
  const { contents: categories } = await getAllCategories();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brandGroup}>
          <Link href="/" className={styles.brand}>
            GORO
          </Link>
          <CategoryDropdown categories={categories} />
        </div>
        <UserActions />
      </div>
    </header>
  );
}
