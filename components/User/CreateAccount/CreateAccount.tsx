import React, { useState } from 'react';
import { auth, firestore } from '../../../firebase';

import useFileChange from '../../../hooks/useFileChange';

import { changevalue } from '../../../redux/formchange/action';
import { useDispatch } from 'react-redux';
import CreateAccountView from './CreateAccountView';
import { CreateAccountInterface } from '../../../interfaces';

const CreateAccount = ({ setIsModal }: CreateAccountInterface) => {
  const [name, setName] = useState(String);
  const [birthday, setBirthday] = useState(String);
  const [gender, setGender] = useState(String);
  const [phone, setPhone] = useState(String);
  const [age, setAge] = useState(Number);
  const id = auth.currentUser?.uid;
  const dispatch = useDispatch();
  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeBirthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };
  const onChangeGenderHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const onChangePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const onChangeAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };
  const { fileUrl, onFileChange } = useFileChange();
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await firestore.collection('users').doc(id).set({
        age,
        avatar: fileUrl,
        name,
        birthday,
        gender,
        phone,
      });
      setIsModal(false);
      dispatch(changevalue());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateAccountView
      fileUrl={fileUrl}
      onFileChange={onFileChange}
      onSubmitHandler={onSubmitHandler}
      onChangeNameHandler={onChangeNameHandler}
      onChangeBirthdayHandler={onChangeBirthdayHandler}
      onChangeGenderHandler={onChangeGenderHandler}
      onChangePhoneHandler={onChangePhoneHandler}
      onChangeAgeHandler={onChangeAgeHandler}
    />
  );
};
export default CreateAccount;
