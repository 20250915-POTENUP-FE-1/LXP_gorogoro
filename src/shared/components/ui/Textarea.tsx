import React from 'react';
import styles from './Textarea.module.css';

type BaseTextAreaProps = React.HTMLAttributes<HTMLInputElement>;
export default function Textarea({}: BaseTextAreaProps) {
  return (
    <div>
      <textarea />
    </div>
  );
}
