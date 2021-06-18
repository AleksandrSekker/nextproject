import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction } from 'react';
import Form from '../FormForPost/Form';
import styles from './scss/modal.module.scss';
interface Props {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({ setIsModal }: Props) => {
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
        <Form />
      </motion.div>
    </motion.div>
  );
};

export default Modal;
