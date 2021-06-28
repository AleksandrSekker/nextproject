import { motion } from 'framer-motion';
import React from 'react';
import { ModalInterface } from '../../../interfaces';
import styles from './scss/modal.module.scss';

const Modal = ({ setIsModal, children }: ModalInterface) => {
  const handleClick = (e: any) => {
    if (e.target.classList.contains('backdrop')) {
      setIsModal(false);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        className={styles.content}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
