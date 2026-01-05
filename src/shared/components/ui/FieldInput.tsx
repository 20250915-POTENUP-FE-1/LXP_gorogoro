import React from 'react';
import styles from './FieldInput.module.css';
import Input from '@/shared/components/ui/Input';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  errorMessage?: string;
  label: string;
};

export default function FieldInput(props: FieldInputProps) {
  const { icon, label, errorMessage, ...rest } = props;
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Input {...rest} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </label>
  );
}
