import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './scss/like.module.scss';
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DocumentData } from '@firebase/firestore-types';
import { useDispatch, useSelector } from 'react-redux';
import { changevalue, selectChange } from '../../../redux/formchange/action';
interface Props {
  id: string;
  userid: string;
}

const Like = ({ id, userid }: Props) => {
  const isChange = useSelector(selectChange);
  const [userLike, setUserLike] = useState<DocumentData>([]);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const likeHandler = () => {
    firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .doc(id)
      .collection('likes')
      .doc(user?.uid)
      .set({
        id: user?.uid,
      });
    dispatch(changevalue());
  };
  const deleteLikeHandler = () => {
    firestore
      .collection('users')
      .doc(userid as string)
      .collection('posts')
      .doc(id)
      .collection('likes')
      .doc(user?.uid)
      .delete();
    dispatch(changevalue());
  };
  const getLikes = async () => {
    try {
      const likesFromFirestore = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('posts')
        .doc(id)
        .collection('likes')
        .get();
      setUserLike(
        likesFromFirestore.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLikes();
  }, [isChange]);
  var item = userLike.find((item: any) => item.id === user?.uid);
  console.log(item);
  return (
    <div className={styles.like__container}>
      {item ? (
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.fill__like}
          onClick={deleteLikeHandler}
        />
      ) : (
        <FontAwesomeIcon
          icon={farHeart}
          className={styles.empty__like}
          onClick={likeHandler}
        />
      )}
      <p>{userLike.length}</p>
    </div>
  );
};

export default Like;
