import {
  faAngleLeft,
  faAngleRight,
  faHome,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

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
        <Link href={`/user/${auth.currentUser?.uid}`}>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            {!isActive && <h3 className={styles.text__link}>Home</h3>}
          </div>
        </Link>
        <Link href={`/user/friend/${auth.currentUser?.uid}`}>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
            {!isActive && <h3 className={styles.text__link}>Friends</h3>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
