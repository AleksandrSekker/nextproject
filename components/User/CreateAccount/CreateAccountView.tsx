import React from 'react';
import { CreateAccount } from '../../../interfaces';
import SubmitButton from '../../submit/SubmitButton';
import UploadFile from '../../UI/fileUpload/UploadFile';
import InputField from '../../UI/inputField/InputField';
import styles from './scss/createaccount.module.scss';

const CreateAccountView = ({
  onSubmitHandler,
  onFileChange,
  onChangeNameHandler,
  onChangeBirthdayHandler,
  onChangeGenderHandler,
  onChangePhoneHandler,
  onChangeAgeHandler,
  fileUrl,
}: CreateAccount) => {
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

export default CreateAccountView;
