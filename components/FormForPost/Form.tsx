import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth, firestore } from '../../firebase';
import useFileChange from '../../hooks/useFileChange';
import { changevalue } from '../../redux/formchange/action';
import UploadFile from '../fileUpload/UploadFile';
import InputField from '../inputField/InputField';
import SubmitButton from '../submit/SubmitButton';

interface Props {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  userid: string | string[];
}
const Form = ({ setIsModal, userid }: Props) => {
  const [title, setTitle] = useState(String);
  const [users, setUsers] = useState<any>([]);
  const [user] = useAuthState(auth);

  const { fileUrl, onFileChange } = useFileChange();

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .get();

      setUsers(dataFromFirebase.data());
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
