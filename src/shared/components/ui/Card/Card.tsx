import { HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
