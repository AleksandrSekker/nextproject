import React from 'react';
import styles from './styles/footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.cont1}>
          <input type="text" className={styles.input__field} />
          <button className={styles.input__btn} type="button">
            Send Message
          </button>
        </div>
        <div className={styles.cont2}>
          <div>
            <a href="https://github.com/AleksandrSekker">
              <FontAwesomeIcon icon={faGithub} className={styles.icons} />
            </a>
            <a href="https://t.me/sekk_er">
              <FontAwesomeIcon icon={faTelegram} className={styles.icons} />
            </a>
            <a href="https://www.linkedin.com/in/aleksandr-sekker-521352161/">
              <FontAwesomeIcon icon={faLinkedin} className={styles.icons} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.created__by}>
        <div className={styles.created__by__child}>
          <h4>
            &copy;
            {currentYear}
            Aleksandr Sekker
          </h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
