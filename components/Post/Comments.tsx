import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import styles from './scss/comments.module.scss';

interface Props {
  id: string;
  isChange: boolean;
}
interface Data {
  username: string;
  text: string;
  id: string;
  avatar: string;
}
const Comments = ({ id, isChange }: Props) => {
  const [comments, setComments]: any = useState([]);

  const getComments = async () => {
    try {
      const commentsFromFirestore = await firestore
        .collection('biography')
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
  return (
    <div>
      {comments.map(({ username, text, id, avatar }: Data) => (
        <div key={id}>
          <div className={styles.flex}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            <strong>{username}</strong>
          </div>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
