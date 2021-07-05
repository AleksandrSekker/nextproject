import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Layout from '../layout/Layout';

const index = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      user && router.push(`/user/${user.uid}`);
    }, 0);
  }, [user?.uid]);
  return <Layout></Layout>;
};

export default index;
