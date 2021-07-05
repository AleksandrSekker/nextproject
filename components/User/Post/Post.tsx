import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SyntheticEvent, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, timestamp } from '../../../firebase';
import Comments from './Comments';
import styles from './scss/post.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changevalue, selectChange } from '../../../redux/formchange/action';
import SubmitButton from '../../submit/SubmitButton';
import InputField from '../../UI/inputField/InputField';
import Link from 'next/link';
import useProfileData from '../../../hooks/useProfileData';
import { DocumentData } from '@firebase/firestore-types';
import Like from './Like';
import CommentButton from './CommentButton';

interface Props {
  data: DocumentData;
  userid: string;
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
  showcomentar: boolean;
}

const Post = ({ data, userid }: Props) => {
  const [comment, setComment] = useState('');
  const isChange = useSelector(selectChange);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { profileData } = useProfileData({ userid });

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
        username: profileData?.name,
        avatar: profileData?.avatar,
        timestamp: timestamp,
        showcomentar: true,
      });

    setComment('');
    dispatch(changevalue());
  };
  console.log(profileData);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const commentHandler = (id: string, showcomentar: boolean) => {
    firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .doc(id)
      .update({ showcomentar: !showcomentar });
    dispatch(changevalue());
  };

  return (
    <div className={styles.post__container}>
      {data.map(
        ({ id, image, title, name, avatar, userid, showcomentar }: Data) => (
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
              <div className={styles.like__and__comment}>
                <Like id={id} userid={userid} />
                <CommentButton
                  id={id}
                  userid={userid}
                  commentHandler={commentHandler}
                  showcomentar={showcomentar}
                />
              </div>
              {showcomentar && (
                <Comments id={id} isChange={isChange} userid={userid} />
              )}
              <form onSubmit={(event) => postComment(event, id)}>
                <InputField
                  placeholder="Write some comment"
                  onChangeHandler={onChangeHandler}
                  size="small"
                />
                <SubmitButton color="blue">Add Button</SubmitButton>
              </form>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Post;
