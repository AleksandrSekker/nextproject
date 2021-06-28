import React from 'react';
import styles from './scss/container.module.scss';
import { Children } from '../../../interfaces/index';

const Container = ({ children }: Children) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
