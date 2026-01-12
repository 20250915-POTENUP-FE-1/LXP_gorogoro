import React from 'react';
import styles from './FieldInput.module.css';
import Input from '@/shared/components/ui/Input';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  errorMessage?: string;
  label: string;
  inputStyle?: React.CSSProperties;
};

export default function FieldInput(props: FieldInputProps) {
  const { icon, label, errorMessage, inputStyle, ...rest } = props;
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Input {...rest} style={inputStyle} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </label>
  );
}
