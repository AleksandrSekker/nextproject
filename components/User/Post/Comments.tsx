import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase';
import styles from './scss/comments.module.scss';
import { DocumentData } from '@firebase/firestore-types';
import { CommentsProps, PostProps } from '../../../interfaces';

const Comments = ({ id, isChange, userid }: PostProps) => {
  const [comments, setComments] = useState<DocumentData>([]);

  const getComments = async () => {
    try {
      const commentsFromFirestore = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('posts')
        .doc(id)
        .collection('comments')
        .get();
      setComments(
        commentsFromFirestore.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
    return () => {
      setComments([]);
    };
  }, [isChange]);
  console.log(comments);
  return (
    <div>
      {comments.map(({ username, text, id, avatar }: CommentsProps) => (
        <div key={id}>
          <div className={styles.flex}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            <p className={styles.username}>{username}</p>
          </div>
          <p className={styles.text}>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
