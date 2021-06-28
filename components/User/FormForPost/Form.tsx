import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth, firestore } from '../../../firebase';
import useFileChange from '../../../hooks/useFileChange';
import { changevalue } from '../../../redux/formchange/action';
import UploadFile from '../../UI/fileUpload/UploadFile';
import InputField from '../../UI/inputField/InputField';
import SubmitButton from '../../submit/SubmitButton';
import { DocumentData } from '@firebase/firestore-types';
import { FormForPost } from '../../../interfaces';

const Form = ({ setIsModal, userid }: FormForPost) => {
  const [title, setTitle] = useState(String);
  const [users, setUsers] = useState<DocumentData>([]);
  const [user] = useAuthState(auth);

  const { fileUrl, onFileChange } = useFileChange();

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .get();

      setUsers(dataFromFirebase.data() as DocumentData);
    } catch (error) {
      setUsers([]);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userid]);
  console.log(users);
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .add({
        title,
        image: fileUrl,
        name: users.name,
        avatar: users.avatar,
        userid: user?.uid,
        showcomentar: true,
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
