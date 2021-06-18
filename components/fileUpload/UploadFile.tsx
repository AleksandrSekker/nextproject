import React from 'react';
import styles from './scss/upload.module.scss';

interface Props {
  onFileChange: any;
}
const UploadFile = ({ onFileChange }: Props) => {
  return (
    <div className={styles.fileUpload}>
      <input type="file" className={styles.upload} onChange={onFileChange} />

      <span>Upload</span>
    </div>
  );
};

export default UploadFile;
