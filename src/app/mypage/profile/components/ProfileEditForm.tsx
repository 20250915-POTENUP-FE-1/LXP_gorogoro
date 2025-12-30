import styles from "./ProfileEditForm.module.css";

export default function ProfileEditForm() {
  return (
    <form className={styles.form}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <div className={styles.avatarPlaceholder} aria-hidden="true">
            👤
          </div>
          {/* <Image src="/path/to/avatar.jpg" alt="프로필 이미지" /> */}
        </div>
        <button type="button" className={styles.avatarButton}>
          이미지 변경
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value="user@example.com"
            readOnly
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            className={styles.input}
            defaultValue="김철수"
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            비밀번호 변경
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="변경할 비밀번호를 입력하세요"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="passwordConfirm" className={styles.label}>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="passwordConfirm"
            className={styles.input}
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          저장하기
        </button>
      </div>
    </form>
  );
}
