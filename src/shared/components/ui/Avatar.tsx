import styles from './Avatar.module.css';

interface AvatarProps {
  nickname: string;
  role: string;
  email: string;
}
const Avatar = ({ nickname, role, email }: AvatarProps) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <span className={styles.name}>{nickname}</span>
        <span className={styles.email}>{email}</span>
      </div>
    </div>
  );
};

export default Avatar;
