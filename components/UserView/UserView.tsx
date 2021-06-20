import React from 'react';
import Button from '../../components/buttons/Button';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
import Form from '../../components/FormForPost/Form';
import Modal from '../../components/modal/Modal';
import Post from './Post/Post';
import styles from './scss/user.module.scss';
import Subscribers from './Subscribers/Subscribers';
interface Props {
  data: any;
  auth: any;
  posts: any;
  userid: string | string[];
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
  isModalSubscribers,
  setIsModalSubscribers,
  modalSubscribersHandler,
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
                    <Button
                      color="blue"
                      children="Subscribers"
                      handler={modalSubscribersHandler}
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
                    <Button
                      color="blue"
                      children="Subscribers"
                      handler={modalSubscribersHandler}
                    />
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
                {isModalSubscribers && (
                  <Modal
                    setIsModal={setIsModalSubscribers}
                    children={
                      <Subscribers
                        setIsModal={setIsModalSubscribers}
                        userid={userid}
                        subscribe={subscribe}
                      />
                    }
                  />
                )}
              </div>
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
