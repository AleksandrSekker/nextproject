import React from 'react';
import styles from './scss/button.module.scss';
interface Props {
  color: string;
  children: string;
  modalHandler: () => void;
}

const Button = ({ color, children, modalHandler }: Props) => {
  return (
    <button
      type="button"
      onClick={modalHandler}
      className={`${styles[color]} ${styles.button}`}
    >
      {children}
    </button>
  );
};

export default Button;
