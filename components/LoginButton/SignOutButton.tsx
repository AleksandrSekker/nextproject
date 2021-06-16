import React from 'react';
import { auth } from '../../firebase';
import styles from './scss/Login.module.scss';

const SignOutButton = () => {
  return (
    auth.currentUser && (
      <button
        type="button"
        className={styles.sign__out}
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
};
export default SignOutButton;
