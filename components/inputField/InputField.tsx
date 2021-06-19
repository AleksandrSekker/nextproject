import { type } from 'os';
import React from 'react';
import styles from './scss/input.module.scss';
interface Props {
  placeholder: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: string;
  type?: string;
}

const InputField = ({ placeholder, onChangeHandler, size }: Props) => {
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
