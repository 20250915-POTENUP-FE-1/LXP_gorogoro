import React, { LabelHTMLAttributes } from "react";
import styles from "./Label.module.css";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
