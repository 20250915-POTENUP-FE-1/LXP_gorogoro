import React from 'react';
import styles from './Input.module.css';

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export default function Input({ icon, ...props }: BaseInputProps) {
  const { className, placeholder, style, ...rest } = props;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        {...rest}
        style={style}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
