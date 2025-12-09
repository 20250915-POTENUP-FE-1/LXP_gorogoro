import ProfileEditForm from "./components/ProfileEditForm";
import styles from "./page.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>내 정보 수정</h1>
      <ProfileEditForm />
    </div>
  );
}
