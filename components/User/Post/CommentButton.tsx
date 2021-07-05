import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useComment from '../../../hooks/useComment';
import styles from './scss/post.module.scss';
interface Props {
  id: string;
  userid: string;
  commentHandler: (id: string, showcomentar: boolean) => void;
  showcomentar: boolean;
}
const CommentButton = ({ id, userid, commentHandler, showcomentar }: Props) => {
  const { comments } = useComment({ userid, id });
  return (
    <div className={styles.comment__icon__container}>
      <FontAwesomeIcon
        icon={faComment}
        className={styles.comment__icon}
        onClick={() => commentHandler(id, showcomentar)}
      />
      <div>{comments.length}</div>{' '}
    </div>
  );
};

export default CommentButton;
