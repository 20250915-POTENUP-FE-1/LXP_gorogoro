import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  role: string;
  nickname?: string;
  email?: string;
}
const Avatar = ({ name, role, nickname, email }: AvatarProps) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.name}>{name}</span>
        <span className={styles.email}>{email}</span>
      </div>
    </div>
  );
};

export default Avatar;
