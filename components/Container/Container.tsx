import React, { ReactNode } from 'react';
import styles from './scss/container.module.scss';
interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
