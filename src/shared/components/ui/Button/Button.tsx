import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

type ButtonProps<T extends ElementType> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | "as"> & {
    as?: T;
  };

const Button = <T extends ElementType = "button">({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  as,
  ...props
}: ButtonProps<T>) => {
  const Component = as || "button";

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
    <Component
      className={buttonClassName}
      {...(Component === "button" ? { disabled: isLoading } : {})}
      {...props}
    >
      {isLoading ? <span>Loading...</span> : children}
    </Component>
  );
};

export default Button;
