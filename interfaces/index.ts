import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

export interface Children {
  children: React.ReactNode;
}
export interface FormForPost {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  userid: string;
}
export interface AlertError {
  showAlert: boolean;
  setShowAlert: (arg0: boolean) => void;
  closeAlert: () => void;
  containerVariant: {
    alertInitial: {
      x: number;
      opacity: number;
    };
    alertAnimate: {
      x: number;
      opacity: number;
      transition: {
        duration: number;
      };
    };
    exitAlert: {
      y: number;
      transition: {
        duration: number;
      };
    };
  };
}

export interface Submit {
  children: string;
  color: string;
  disabledButton?: boolean;
}
export interface ButtonInterface {
  color: string;
  children: string;
  handler?: () => void;
}
export interface UploadFileInterface {
  onFileChange: ChangeEventHandler<HTMLInputElement>;
}

export interface InputInterface {
  placeholder: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: string;
  type?: string;
}
export interface CreateAccount {
  onSubmitHandler: (e: React.SyntheticEvent) => Promise<void>;
  fileUrl: null;
  onFileChange: (e: any) => Promise<void>;
  onChangeNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBirthdayHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGenderHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhoneHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAgeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface ModalInterface {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}
export interface CreateAccountInterface {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SubscribeInterface {
  avatar: string;
  id: string;
}
export interface CommentsProps {
  username: string;
  text: string;
  id: string;
  avatar: string;
}

export interface PostProps {
  id: string;
  isChange: boolean;
  userid: string;
}
