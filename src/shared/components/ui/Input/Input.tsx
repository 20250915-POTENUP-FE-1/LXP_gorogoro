import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputSize = "sm" | "md" | "lg";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: string;
  size?: InputSize;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, size = "md", className = "", ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          className={`${styles.input} ${styles[size]} ${
            error ? styles.error : ""
          } ${className}`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
