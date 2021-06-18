import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth, firestore, storage } from '../../firebase';
import { changevalue } from '../../redux/formchange/action';
import UploadFile from '../fileUpload/UploadFile';
import InputField from '../inputField/InputField';
import SubmitButton from '../submit/SubmitButton';

const Form = () => {
  const [title, setTitle] = useState(String);
  const [fileUrl, setFileUrl] = useState(null);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await firestore.collection('biography').add({
      title,
      image: fileUrl,
      name: user?.displayName,
      avatar: user?.photoURL,
      userid: user?.uid,
    });

    dispatch(changevalue());
  };
  console.log(fileUrl);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <UploadFile onFileChange={onFileChange} />
        <InputField
          placeholder="Write some description"
          onChangeHandler={onChangeHandler}
          size="large"
        />
        {/* {<Loader />} */}
        <SubmitButton color="blue" disabledButton={!fileUrl}>
          Submit
        </SubmitButton>
      </form>
    </div>
  );
};

export default Form;
