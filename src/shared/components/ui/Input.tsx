import React from 'react';
import styles from './Input.module.css';

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export default function Input({ icon, ...props }: BaseInputProps) {
  const { className, placeholder, ...rest } = props;

  return (
    <div style={{ position: 'relative' }}>
      <input {...rest} placeholder={placeholder} className={`${styles.input} ${className}`} />
    </div>
  );
}
