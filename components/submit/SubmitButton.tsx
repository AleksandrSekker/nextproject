import React from 'react';
import styles from './scss/submit.module.scss';
interface Props {
  children: string;
  color: string;
  disabledButton?: any;
}

const SubmitButton = ({ children, color, disabledButton }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabledButton}
      className={`${styles.submit} ${styles[color]}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
