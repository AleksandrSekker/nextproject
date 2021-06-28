import { type } from 'os';
import React from 'react';
import { InputInterface } from '../../../interfaces';
import styles from './scss/input.module.scss';

const InputField = ({ placeholder, onChangeHandler, size }: InputInterface) => {
  return (
    <input
      type={`${type || 'text'}`}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={`${styles.input__field} ${styles[size]}`}
    />
  );
};

export default InputField;
