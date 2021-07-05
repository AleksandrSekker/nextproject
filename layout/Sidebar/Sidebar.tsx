import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faHome,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase';
import styles from './scss/sidebar.module.scss';

const Sidebar = () => {
  const [navFalse, setNavFalse] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  const sliderHandler = () => {
    if (isActive && navFalse) {
      setIsActive(false);
      setNavFalse(false);
    } else {
      setIsActive(true);
      setNavFalse(true);
    }
  };
  const [user] = useAuthState(auth);

  return (
    <div
      className={`${styles.navcontent__vertical} ${
        navFalse ? styles.nav__false : ''
      }`}
    >
      <button onClick={sliderHandler} className={styles.button__handler}>
        {isActive ? (
          <FontAwesomeIcon icon={faAngleRight} className={styles.icon__arraw} />
        ) : (
          <FontAwesomeIcon icon={faAngleLeft} className={styles.icon__arraw} />
        )}
      </button>
      <div className={styles.content}>
        {user && (
          <>
            {/* <Link href={`/user/feed/${user.uid}`}>
              <div className={styles.link}>
                <FontAwesomeIcon icon={faHome} className={styles.icon} />
                {!isActive && <h3 className={styles.text__link}>Feed</h3>}
              </div>
            </Link> */}
            <Link href={`/user/${user.uid}`}>
              <div className={styles.link}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                {!isActive && <h3 className={styles.text__link}>My page</h3>}
              </div>
            </Link>
            <Link href={`/user/friend/${user.uid}`}>
              <div className={styles.link}>
                <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
                {!isActive && <h3 className={styles.text__link}>Friends</h3>}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
