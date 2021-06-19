import React, { useState } from 'react';
import styles from './scss/createaccount.module.scss';
import { auth, firestore } from '../../firebase';
import InputField from '../inputField/InputField';
import SubmitButton from '../submit/SubmitButton';
import useFileChange from '../../hooks/useFileChange';
import UploadFile from '../fileUpload/UploadFile';
import { changevalue } from '../../redux/formchange/action';
import { useDispatch } from 'react-redux';
interface Props {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateAccount = ({ setIsModal }: Props) => {
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
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <UploadFile onFileChange={onFileChange} />
      <InputField
        placeholder="Please type your name"
        onChangeHandler={onChangeNameHandler}
        size="large"
      />
      <InputField
        placeholder="Please type your birthday"
        onChangeHandler={onChangeBirthdayHandler}
        size="large"
      />
      <InputField
        placeholder="Please type your gender"
        onChangeHandler={onChangeGenderHandler}
        size="large"
      />
      <InputField
        placeholder="Please type your phone"
        onChangeHandler={onChangePhoneHandler}
        size="large"
      />
      <InputField
        placeholder="Please type your age"
        onChangeHandler={onChangeAgeHandler}
        size="large"
        type="number"
      />
      <SubmitButton color="blue" disabledButton={!fileUrl}>
        Submit
      </SubmitButton>
    </form>
  );
};
export default CreateAccount;
