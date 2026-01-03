import React from 'react';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <span className={styles.errorMessage}>{errorMessage}</span>;
}
