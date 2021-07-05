import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './scss/Header.module.scss';
import ErrorAlert from '../../components/UI/Alert/ErrorAlert/ErrorAlert';
import { auth } from '../../firebase';
import SignInButton from '../../components/UI/LoginButton/SignInButton';
import SignOutButton from '../../components/UI/LoginButton/SignOutButton';
import { useState } from 'react';

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [navFalse, setNavFalse] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const hamburgerHandler = () => {
    if (isActive && navFalse) {
      setIsActive(false);
      setNavFalse(false);
    } else {
      setIsActive(true);
      setNavFalse(true);
    }
  };

  return (
    <>
      <header className={styles.background}>
        <div className={styles.header__container}>
          <div className={styles.container__for__logo__and__switch}>
            <Link href="/">
              <p className={`${styles.logo} ${styles.paragraph}`}>Home</p>
            </Link>
          </div>

          <div>
            {user ? (
              <SignOutButton />
            ) : (
              <>
                <SignInButton />
              </>
            )}
          </div>

          <button
            type="button"
            className={`${styles.hamburger}
           ${isActive ? styles.open : ''}
           `}
            onClick={hamburgerHandler}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div>
          {user && (
            <div className={styles.auth__container}>
              <p className={styles.paragraph}>
                {auth.currentUser?.displayName}
              </p>
              <img
                className={styles.avatar}
                alt="img"
                src={
                  auth.currentUser?.photoURL ||
                  'https://api.adorable.io/avatars/23/abott@adorable.png'
                }
              />
              <p className={styles.paragraph}>{auth.currentUser?.email}</p>
            </div>
          )}
        </div>

        <ErrorAlert showAlert={showAlert} setShowAlert={setShowAlert} />
        <div
          className={`${styles.navcontent__vertical} ${
            navFalse ? styles.nav__false : ''
          }`}
        >
          <Link href="/">Main</Link>
        </div>
      </header>
    </>
  );
};
export default Header;
