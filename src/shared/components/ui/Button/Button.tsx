import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  // 클래스명 결합
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        // 간단한 로딩 텍스트 (추후 Spinner 컴포넌트로 대체 가능)
        <span>Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
