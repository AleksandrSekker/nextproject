import React from 'react';
import styles from './scss/comments.module.scss';

import { CommentsProps, PostProps } from '../../../interfaces';
import useComment from '../../../hooks/useComment';

const Comments = ({ id, userid }: PostProps) => {
  const { comments } = useComment({ userid, id });

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
