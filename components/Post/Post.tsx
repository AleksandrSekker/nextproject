import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, timestamp } from '../../firebase';
import Comments from './Comments';
import styles from './scss/post.module.scss';
interface Props {
  data: any;
  isChange: boolean;
  setIsChange: Dispatch<SetStateAction<boolean>>;
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
  };
}

const Post = ({ data, isChange, setIsChange }: Props) => {
  const [comment, setComment] = useState('');
  const [user] = useAuthState(auth);
  const deleteHandler = (id: string) => {
    setIsChange(!isChange);
    firestore.collection('biography').doc(id).delete();
  };
  const postComment = (event: SyntheticEvent, postId: string) => {
    event.preventDefault();
    firestore.collection('biography').doc(postId).collection('comments').add({
      text: comment,
      username: user?.displayName,
      timestamp: timestamp,
    });
    setComment('');
    setIsChange(!isChange);
  };

  return (
    <div className={styles.post__container}>
      {data.map(({ id, image, title, name, avatar, userid }: Data) => (
        <div key={id}>
          <div className={styles.post__header}>
            <div className={styles.post__owner}>
              <img src={avatar} alt="avatar" className={styles.avatar} />
              <p>{name}</p>
            </div>
            {user?.uid === userid && (
              <button onClick={() => deleteHandler(id)}>Delete</button>
            )}
          </div>
          <img src={image} alt="post image" className={styles.image} />
          <p>{title}</p>
          <form onSubmit={(event) => postComment(event, id)}>
            <input
              type="text"
              placeholder="Write some comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Add comment</button>
          </form>
          <Comments id={id} isChange={isChange} />
        </div>
      ))}
    </div>
  );
};

export default Post;
