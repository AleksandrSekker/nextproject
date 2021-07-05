import { useState } from 'react';
import { storage } from '../firebase';

const useFileChange = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  return { fileUrl, onFileChange };
};
export default useFileChange;
