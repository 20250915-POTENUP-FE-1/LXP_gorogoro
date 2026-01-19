import React from 'react';
import styles from './Textarea.module.css';

type BaseTextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  icon?: React.ReactNode;
  rows?: number;
};

export default function Textarea({ icon, ...props }: BaseTextareaProps) {
  const { className, placeholder, rows, style, ...rest } = props;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <textarea
        {...rest}
        style={style}
        className={`${styles.textarea} ${className}`}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
