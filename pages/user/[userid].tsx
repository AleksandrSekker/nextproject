import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import UserView from '../../components/UserView/UserView';
import { auth, firestore } from '../../firebase';
import Layout from '../../layout/Layout';
import { changevalue, selectChange } from '../../redux/formchange/action';

const User = () => {
  const [data, setData] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [isModal, setIsModal] = useState(false);
  const [subscribe, setSubscribe] = useState<any>([]);
  const [currUserSub, setcurrUserSub] = useState<any>();
  const [isModalPost, setIsModalPost] = useState(false);
  const [isModalSubscribers, setIsModalSubscribers] = useState(false);
  const [posts, setPosts] = useState<any>([]);
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

      setData(dataFromFirebase.data());
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
      setcurrUserSub(isCurrentUserSubscribed.data());

      const postUser = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('posts')
        .get();
      setPosts(postUser.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoaded(true);
    } catch (error) {
      setData([]);
      setSubscribe([]);
      setcurrUserSub(null);
      setIsError(true);
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
      setLoaded(true);
      dispatch(changevalue());
    } catch (error) {
      setSubscribe([]);
      setIsError(true);
      console.log(error);
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

      setLoaded(true);
      dispatch(changevalue());
    } catch (error) {
      setSubscribe([]);
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    return () => setLoaded(false);
  }, [isChange, userid]);
  console.log(data);
  return (
    <Layout title={`${data?.name || 'user page'} `}>
      <Container>
        {isError && <div>Error</div>}
        {!loaded ? (
          <Loader />
        ) : (
          <UserView
            data={data}
            auth={auth}
            userid={userid}
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
        )}
      </Container>
    </Layout>
  );
};

export default User;
