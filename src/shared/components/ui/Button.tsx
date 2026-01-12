import React from 'react';
import styles from './Button.module.css';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'submit'
  | 'cancel'
  | 'edit'
  | 'delete'
  | 'add'
  | 'cta'
  | 'avatar'
  | 'category'
  | 'chip'
  | 'tab'
  | 'navItem';

type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  submit: styles.submitButton,
  cancel: styles.cancelButton,
  edit: styles.editButton,
  delete: styles.deleteButton,
  add: styles.addButton,
  cta: styles.ctaButton,
  avatar: styles.avatarButton,
  category: styles.categoryButton,
  chip: styles.chipButton,
  tab: styles.tabButton,
  navItem: styles.navItem,
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  full: styles.sizeFull,
};

export const Button = ({
  variant,
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const variantClass = variantClassMap[variant];
  const sizeClass = sizeClassMap[size];

  return (
    <button
      {...rest}
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass} ${rest.className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
