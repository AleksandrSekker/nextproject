import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styles from './scss/ErrorAlert.module.scss';

interface Props {
  showAlert: boolean;
  setShowAlert: (arg0: boolean) => void;
}

const ErrorAlert = ({ showAlert, setShowAlert }: Props) => {
  const closeAlert = () => {
    setShowAlert(false);
  };
  const containerVariant = {
    alertInitial: { x: -100, opacity: 0 },
    alertAnimate: { x: 0, opacity: 1, transition: { duration: 1 } },
    exitAlert: { y: -1000, transition: { duration: 1 } }
  };
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
export default ErrorAlert;
