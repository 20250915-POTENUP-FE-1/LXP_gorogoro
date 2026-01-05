import styles from "./Avatar.module.css";

interface AvatarProps {
  nickname: string;
  role: string;
}
const Avatar = ({ nickname, role }: AvatarProps) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <span className={styles.name}>{nickname}</span>
        <span className={styles.email}>{role}</span>
      </div>
    </div>
  );
};

export default Avatar;
