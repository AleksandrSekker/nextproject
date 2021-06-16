import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../../firebase';

interface Props {
  isChange: boolean;
  setIsChange: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ isChange, setIsChange }: Props) => {
  const [title, setTitle] = useState(String);
  const [fileUrl, setFileUrl] = useState(null);
  const [user] = useAuthState(auth);
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  const onSubmitHandler = (e: React.SyntheticEvent) => {
    setIsChange(!isChange);
    firestore.collection('biography').add({
      title,
      image: fileUrl,
      name: user?.displayName,
      avatar: user?.photoURL,
      userid: user?.uid,
    });
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <input type="file" onChange={onFileChange} />
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
