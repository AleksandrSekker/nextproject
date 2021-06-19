import React from 'react';
import styles from './scss/button.module.scss';
interface Props {
  color: string;
  children: string;
  handler?: () => void;
}

const Button = ({ color, children, handler }: Props) => {
  return (
    <button
      type="button"
      onClick={handler}
      className={`${styles[color]} ${styles.button}`}
    >
      {children}
    </button>
  );
};

export default Button;
