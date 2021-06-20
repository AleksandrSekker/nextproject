import {
  faBackspace,
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SyntheticEvent, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, timestamp } from '../../../firebase';
import Comments from './Comments';
import styles from './scss/post.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changevalue, selectChange } from '../../../redux/formchange/action';
import SubmitButton from '../../submit/SubmitButton';
import InputField from '../../inputField/InputField';
import Link from 'next/link';
// import { motion } from 'framer-motion';
interface Props {
  data: any;
  userid: string | string[];
}
interface Data {
  id: string;
  image: string;
  title: string;
  name: string;
  avatar: string;
  userid: string;
  comments: {
    text: string;
    username: string;
    avatar: string;
  };
}

const Post = ({ data, userid }: Props) => {
  const [comment, setComment] = useState('');
  const isChange = useSelector(selectChange);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const deleteHandler = (id: string) => {
    firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .doc(id)
      .delete();
    dispatch(changevalue());
  };
  const postComment = (event: SyntheticEvent, postId: string) => {
    event.preventDefault();
    firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        text: comment,
        username: user?.displayName,
        avatar: user?.photoURL,
        timestamp: timestamp,
      });
    setComment('');
    dispatch(changevalue());
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.post__container}>
      {data.map(({ id, image, title, name, avatar, userid }: Data) => (
        <div key={id} className={styles.post}>
          <div className={styles.post__header}>
            <Link href={`${userid}`}>
              <div className={styles.post__owner}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
                <p>{name}</p>
              </div>
            </Link>
            {user?.uid === userid && (
              <button className={styles.button__delete}>
                <FontAwesomeIcon
                  icon={faBackspace}
                  className={styles.icon__delete}
                  onClick={() => deleteHandler(id)}
                />
              </button>
            )}
          </div>
          <img src={image} alt="post image" className={styles.image} />
          <div className={styles.body__container}>
            <p>{title}</p>
            <FontAwesomeIcon icon={faHeart} className={styles.fill__like} />
            <FontAwesomeIcon icon={farHeart} className={styles.empty__like} />
            <FontAwesomeIcon
              icon={faComment}
              className={styles.comment__icon}
            />
            <p>Amount likes</p>
            <form onSubmit={(event) => postComment(event, id)}>
              <InputField
                placeholder="Write some comment"
                onChangeHandler={onChangeHandler}
                size="small"
              />
              <SubmitButton color="blue">Add Button</SubmitButton>
            </form>

            <Comments id={id} isChange={isChange} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
