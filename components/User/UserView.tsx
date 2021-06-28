import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import Button from '../UI/buttons/Button';
import Modal from '../UI/modal/Modal';
import Post from './Post/Post';
import styles from './scss/user.module.scss';
import CreateAccount from './CreateAccount/CreateAccount';
import Form from './FormForPost/Form';

interface Props {
  data: any;
  auth: any;
  posts: any;
  userid: string;
  modalHandler: () => void;
  modalPostHandler: () => void;
  currUserSub: any;
  unSubscribeHandler: () => Promise<void>;
  subscribeHandler: () => Promise<void>;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModalPost: boolean;
  setIsModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  subscribe: any;
  isModalSubscribers: boolean;
  setIsModalSubscribers: React.Dispatch<React.SetStateAction<boolean>>;
  modalSubscribersHandler: () => void;
}

const UserView = ({
  data,
  auth,
  posts,
  userid,
  modalHandler,
  modalPostHandler,
  currUserSub,
  unSubscribeHandler,
  subscribeHandler,
  isModal,
  setIsModal,
  isModalPost,
  setIsModalPost,
  subscribe,
}: Props) => {
  return (
    <div>
      {data ? (
        <>
          <div className={styles.flex}>
            <img src={data.avatar} alt="" className={styles.avatar} />
            <div>
              <p className={`${styles.paragraph} ${styles.name}`}>
                {data.name}
              </p>
              <div className={styles.header__profile}>
                {auth.currentUser?.uid === userid ? (
                  <>
                    <Button
                      color="blue"
                      children="Update Profile"
                      handler={modalHandler}
                    />
                    <Button
                      color="blue"
                      children="Add Post"
                      handler={modalPostHandler}
                    />
                  </>
                ) : (
                  <>
                    {currUserSub ? (
                      <Button
                        color="grey"
                        children="Unsubscribe"
                        handler={unSubscribeHandler}
                      />
                    ) : (
                      <Button
                        color="purple"
                        children="Subscribe"
                        handler={subscribeHandler}
                      />
                    )}
                  </>
                )}

                {isModal && (
                  <Modal
                    setIsModal={setIsModal}
                    children={<CreateAccount setIsModal={setIsModal} />}
                  />
                )}

                {isModalPost && (
                  <Modal
                    setIsModal={setIsModalPost}
                    children={
                      <Form setIsModal={setIsModalPost} userid={userid} />
                    }
                  />
                )}
              </div>
              <Link href={`/user/friend/${userid}`}>
                <button className={styles.button__friend}>
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className={styles.friend__icon}
                  />
                  <p className={styles.friend__text}>Friend</p>
                </button>
              </Link>
              <p>{subscribe.length} Subscribers</p>
              <p className={styles.paragraph}>{data.age}</p>
              <p className={styles.paragraph}>{data.birthday}</p>
              <p className={styles.paragraph}>{data.gender}</p>
              <p className={styles.paragraph}>{data.phone}</p>
            </div>
          </div>
          <Post data={posts} userid={userid} />
        </>
      ) : (
        <>
          <p>Please create profile</p>
          <Button
            color="blue"
            children="Create Profile"
            handler={modalHandler}
          />
          {isModal && (
            <Modal
              setIsModal={setIsModal}
              children={<CreateAccount setIsModal={setIsModal} />}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserView;
