import firebase from 'firebase';
import React from 'react';
import { auth } from '../../../firebase';
import styles from './scss/Login.module.scss';

const SignInButton = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button
      type="button"
      className={styles.sign__in}
      onClick={signInWithGoogle}
    >
      Sign in
    </button>
  );
};
export default SignInButton;
