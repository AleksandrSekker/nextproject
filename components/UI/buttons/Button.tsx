import React from 'react';
import { ButtonInterface } from '../../../interfaces';
import styles from './scss/button.module.scss';

const Button = ({ color, children, handler }: ButtonInterface) => {
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
