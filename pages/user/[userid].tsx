import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/buttons/Button';
import Container from '../../components/Container/Container';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/modal/Modal';
import { auth, firestore } from '../../firebase';
import Layout from '../../layout/Layout';
import { selectChange } from '../../redux/formchange/action';
import styles from './scss/user.module.scss';
const User = () => {
  const [data, setData] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [isModal, setIsModal] = useState(false);
  const [subscribe, setSubscribe] = useState<any>([]);
  const isChange = useSelector(selectChange);
  const router = useRouter();
  const { userid } = router.query;
  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .get();

      setData(dataFromFirebase.data());

      setLoaded(true);
    } catch (error) {
      setData([]);
      setIsError(true);
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
    return () => setLoaded(false);
  }, [isChange]);
  const modalHandler = () => {
    setIsModal(!isModal);
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
        });
      const dataFromFirebase = await firestore
        .collection('users')
        .doc(userid as string)
        .collection('subscribers')
        .doc(auth.currentUser?.uid as string)
        .get();
      if (dataFromFirebase) {
        setSubscribe(dataFromFirebase.data());
      }
      setLoaded(true);
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
    } catch (error) {
      setSubscribe([]);
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    subscribeHandler();
    unSubscribeHandler();
    return () => setLoaded(false);
  }, [isChange]);
  console.log(subscribe);
  return (
    <Layout title={`${data?.name || 'user page'} `}>
      <Container>
        {isError && <div>Error</div>}
        {!loaded ? (
          <Loader />
        ) : (
          <div>
            {data ? (
              <>
                <div className={styles.flex}>
                  <img src={data.avatar} alt="" className={styles.avatar} />
                  <div>
                    <p className={`${styles.paragraph} ${styles.name}`}>
                      {data.name}
                    </p>
                    <div className={styles.header__profile}>
                      {auth.currentUser?.uid === userid ? (
                        <Button
                          color="blue"
                          children="Update Profile"
                          handler={modalHandler}
                        />
                      ) : (
                        <>
                          <Button
                            color="purple"
                            children="Subscribe"
                            handler={subscribeHandler}
                          />

                          <Button
                            color="grey"
                            children="Unsubscribe"
                            handler={unSubscribeHandler}
                          />
                        </>
                      )}

                      {isModal && (
                        <Modal
                          setIsModal={setIsModal}
                          children={<CreateAccount setIsModal={setIsModal} />}
                        />
                      )}
                    </div>
                    {/* <p>{subscribe.length} Subscribers</p> */}
                    <p className={styles.paragraph}>{data.age}</p>
                    <p className={styles.paragraph}>{data.birthday}</p>
                    <p className={styles.paragraph}>{data.gender}</p>
                    <p className={styles.paragraph}>{data.phone}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>Please create profile</p>
                <Button
                  color="blue"
                  children="Create Profile"
                  handler={modalHandler}
                />
                {isModal && (
                  <Modal
                    setIsModal={setIsModal}
                    children={<CreateAccount setIsModal={setIsModal} />}
                  />
                )}
              </>
            )}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default User;
