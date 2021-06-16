import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';

interface Props {
  id: string;
  isChange: boolean;
}
interface Data {
  username: string;
  text: string;
  id: string;
}
const Comments = ({ id, isChange }: Props) => {
  const [comments, setComments]: any = useState([]);

  const getComments = async () => {
    const commentsFromFirestore = await firestore
      .collection('biography')
      .doc(id)
      .collection('comments')
      // .orderBy('timestamp', 'asc')
      .get();
    setComments(
      commentsFromFirestore.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    getComments();
  }, [isChange]);
  return (
    <div>
      {comments.map(({ username, text, id }: Data) => (
        <p key={id}>
          <strong>{username}</strong> {text}
        </p>
      ))}
    </div>
  );
};

export default Comments;
