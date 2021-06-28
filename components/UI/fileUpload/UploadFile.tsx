import React from 'react';
import { UploadFileInterface } from '../../../interfaces';
import styles from './scss/upload.module.scss';

const UploadFile = ({ onFileChange }: UploadFileInterface) => {
  return (
    <div className={styles.fileUpload}>
      <input type="file" className={styles.upload} onChange={onFileChange} />
      <span>Upload</span>
    </div>
  );
};

export default UploadFile;
