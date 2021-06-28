import React from 'react';
import { Submit } from '../../interfaces';
import styles from './scss/submit.module.scss';

const SubmitButton = ({ children, color, disabledButton }: Submit) => {
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
