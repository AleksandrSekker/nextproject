import { motion } from 'framer-motion';
import React from 'react';
import { Children } from '../../../interfaces';

const PageAnimation = ({ children }: Children) => {
  return (
    <motion.div
      initial={{ scaleY: 0.9, translateX: 150, opacity: 0 }}
      animate={{ scaleY: 1, translateX: 0, opacity: 1 }}
      exit={{ scale: 0.9, translateX: -150, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimation;
