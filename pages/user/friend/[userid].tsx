import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../../components/Layout/Container/Container';
import ErrorLoadContainer from '../../../components/Layout/ErrorLoadContainer/ErrorLoadContainer';
import FriendView from '../../../components/User/FriendView/FriendView';
import { firestore } from '../../../firebase';
import Layout from '../../../layout/Layout';
import { errorfalse, errortrue } from '../../../redux/error/action';
import { DocumentData } from '@firebase/firestore-types';
const Friend = () => {
  const [subscribe, setSubscribe] = useState<DocumentData>([]);
  const router = useRouter();
  const { userid } = router.query;
  const dispatch = useDispatch();
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
      dispatch(errorfalse());
    } catch (error) {
      setSubscribe([]);
      dispatch(errortrue());
    }
  };
  useEffect(() => {
    fetchData();
  }, [userid]);

  return (
    <Layout title="Friends">
      <Container>
        <ErrorLoadContainer>
          <FriendView subscribe={subscribe} />
        </ErrorLoadContainer>
      </Container>
    </Layout>
  );
};

export default Friend;
