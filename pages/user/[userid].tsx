import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Layout/Container/Container';
import ErrorLoadContainer from '../../components/Layout/ErrorLoadContainer/ErrorLoadContainer';
import UserView from '../../components/User/UserView';
import { auth, firestore } from '../../firebase';
import Layout from '../../layout/Layout';
import { errortrue } from '../../redux/error/action';
import { changevalue, selectChange } from '../../redux/formchange/action';
import { loadfalse, loadtrue } from '../../redux/load/action';
import { DocumentData } from '@firebase/firestore-types';
const User = () => {
  const [data, setData] = useState<DocumentData>([]);
  const [isModal, setIsModal] = useState(false);
  const [subscribe, setSubscribe] = useState<DocumentData>([]);
  const [currUserSub, setcurrUserSub] = useState<DocumentData | null>([]);
  const [isModalPost, setIsModalPost] = useState(false);
  const [isModalSubscribers, setIsModalSubscribers] = useState(false);
  const [posts, setPosts] = useState<DocumentData>([]);
  const isChange = useSelector(selectChange);
  const router = useRouter();
  const { userid } = router.query;
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .get();

      setData(dataFromFirebase.data() as DocumentData);
      const subscribeFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('subscribers')
        .get();
      setSubscribe(
        subscribeFromFirebase.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );

      const isCurrentUserSubscribed = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('subscribers')
        .doc(auth.currentUser?.uid)
        .get();
      setcurrUserSub(isCurrentUserSubscribed.data() as DocumentData);

      const postUser = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('posts')
        .get();
      setPosts(
        postUser.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      dispatch(loadtrue());
    } catch (error) {
      setData([]);
      setSubscribe([]);
      setcurrUserSub(null);
      dispatch(loadfalse);
      dispatch(errortrue());
      console.log(error);
    }
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };
  const modalPostHandler = () => {
    setIsModalPost(!isModalPost);
  };
  const modalSubscribersHandler = () => {
    setIsModalSubscribers(!isModalSubscribers);
  };

  const subscribeHandler = async () => {
    try {
      await firestore
        .collection('users')
        .doc(userid as string)
        .collection('subscribers')
        .doc(auth.currentUser?.uid)
        .set({
          avatar: auth.currentUser?.photoURL,
          id: auth.currentUser?.uid,
        });
      dispatch(loadtrue());
      dispatch(changevalue());
    } catch (error) {
      setSubscribe([]);
      dispatch(errortrue());
    }
  };

  const unSubscribeHandler = async () => {
    try {
      await firestore
        .collection('users')
        .doc(userid as string)
        .collection('subscribers')
        .doc(auth.currentUser?.uid)
        .delete();

      dispatch(loadtrue());
      dispatch(changevalue());
    } catch (error) {
      setSubscribe([]);
      dispatch(errortrue());
    }
  };
  useEffect(() => {
    fetchData();
  }, [isChange, userid]);

  return (
    <Layout title={`${data?.name || 'user page'} `}>
      <Container>
        <ErrorLoadContainer>
          <UserView
            data={data}
            auth={auth}
            userid={userid as string}
            modalHandler={modalHandler}
            modalPostHandler={modalPostHandler}
            currUserSub={currUserSub}
            unSubscribeHandler={unSubscribeHandler}
            subscribeHandler={subscribeHandler}
            isModal={isModal}
            setIsModal={setIsModal}
            isModalPost={isModalPost}
            setIsModalPost={setIsModalPost}
            subscribe={subscribe}
            posts={posts}
            isModalSubscribers={isModalSubscribers}
            modalSubscribersHandler={modalSubscribersHandler}
            setIsModalSubscribers={setIsModalSubscribers}
          />
        </ErrorLoadContainer>
      </Container>
    </Layout>
  );
};

export default User;
