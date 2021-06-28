import {
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './scss/ErrorAlert.module.scss';
import React from 'react';
import { AlertError } from '../../../../interfaces';

const ErrorAlertView = ({
  showAlert,
  containerVariant,
  closeAlert,
}: AlertError) => {
  return (
    <AnimatePresence>
      {showAlert && (
        <div className={styles.alert__container}>
          <motion.div
            variants={containerVariant}
            initial="alertInitial"
            animate="alertAnimate"
            exit="exitAlert"
            className={styles.alert__container}
          >
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
            <p>Error</p>
            <FontAwesomeIcon icon={faTimes} onClick={closeAlert} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlertView;
