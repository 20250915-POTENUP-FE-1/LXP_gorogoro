import React from 'react';
import styles from './FieldInput.module.css';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';
import Textarea from '@/shared/components/ui/Textarea';

type FieldTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon?: React.ReactNode;
  errorMessage?: string;
  label: string;
  textareaStyle?: React.CSSProperties;
};

export default function FieldTextarea(props: FieldTextareaProps) {
  const { icon, label, errorMessage, textareaStyle, ...rest } = props;
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Textarea {...rest} style={textareaStyle} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </label>
  );
}
