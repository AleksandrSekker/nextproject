import React from 'react';
import styles from './scss/loader.module.scss';

const Loader = () => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </>
  );
};

export default Loader;
