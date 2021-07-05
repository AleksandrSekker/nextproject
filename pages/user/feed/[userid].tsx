import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { DocumentData } from '@firebase/firestore-types';
import { auth, firestore } from '../../../firebase';
import Layout from '../../../layout/Layout';

const Feed = () => {
  const [user] = useAuthState(auth);

  const [subscribersFromFirestore, setSubscribersFromFirestore] =
    useState<DocumentData>([]);

  let feedNames = subscribersFromFirestore.map((subscriber: { id: string }) => {
    return subscriber.id;
  });
  feedNames = [...feedNames, user?.uid];
  feedNames.forEach((item: any) => {
    console.log(item);
  });
  const fetchData = async () => {
    const mySubscribers = await firestore
      .collection('users')
      .doc(user?.uid)
      .collection('subscribers')
      .get();
    setSubscribersFromFirestore(
      mySubscribers.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  console.log(feedNames);
  return <Layout></Layout>;
};

export default Feed;
