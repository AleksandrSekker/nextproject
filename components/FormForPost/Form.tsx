import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth, firestore } from '../../firebase';
import useFileChange from '../../hooks/useFileChange';
import { changevalue } from '../../redux/formchange/action';
import UploadFile from '../fileUpload/UploadFile';
import InputField from '../inputField/InputField';
import SubmitButton from '../submit/SubmitButton';

interface Props {
  setIsModal?: any;
}
const Form = ({ setIsModal }: Props) => {
  const [title, setTitle] = useState(String);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const { fileUrl, onFileChange } = useFileChange();
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await firestore.collection('biography').add({
      title,
      image: fileUrl,
      name: user?.displayName,
      avatar: user?.photoURL,
      userid: user?.uid,
    });
    setIsModal(false);
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
        <SubmitButton color="blue" disabledButton={!fileUrl}>
          Submit
        </SubmitButton>
      </form>
    </div>
  );
};

export default Form;
