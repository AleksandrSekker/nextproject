import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import FriendView from '../../../components/FriendView/FriendView';
import Loader from '../../../components/Loader/Loader';
import { firestore } from '../../../firebase';
import Layout from '../../../layout/Layout';

const Friend = () => {
  const [subscribe, setSubscribe] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const router = useRouter();
  const { userid } = router.query;

  const fetchData = async () => {
    try {
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
      setLoaded(true);
    } catch (error) {
      setSubscribe([]);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
    return () => setLoaded(false);
  }, [userid]);

  return (
    <Layout title="Friends">
      <Container>
        {isError && <div>Error</div>}
        {!loaded ? <Loader /> : <FriendView subscribe={subscribe} />}
      </Container>
    </Layout>
  );
};

export default Friend;
