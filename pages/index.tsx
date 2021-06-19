import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Loader from '../components/Loader/Loader';
import Post from '../components/Post/Post';
import { auth, firestore } from '../firebase';
import Layout from '../layout/Layout';

import { useSelector } from 'react-redux';

import { selectChange } from '../redux/formchange/action';
import Modal from '../components/modal/Modal';
import Button from '../components/buttons/Button';
import Link from 'next/link';
import Form from '../components/FormForPost/Form';

const IndexPage = () => {
  const [data, setData] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [isModal, setIsModal] = useState(false);

  const isChange = useSelector(selectChange);

  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore.collection('biography').get();
      setData(
        dataFromFirebase.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          showComments: true,
        }))
      );
      setLoaded(true);
    } catch (error) {
      setData([]);
      setIsError(true);
      console.log(error);
    }
  };
  const modalHandler = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    fetchData();
    return () => setLoaded(false);
  }, [isChange]);

  return (
    <Layout title="Home">
      <Container>
        {isError && <div>Error</div>}
        {!loaded ? (
          <Loader />
        ) : (
          <div>
            <Container>
              <Link href={`user/${auth.currentUser?.uid}`}>
                <div>
                  <Button color="purple" children="My page" />
                </div>
              </Link>

              <Button color="blue" children="Modal" handler={modalHandler} />
            </Container>
            {isModal && (
              <Modal
                setIsModal={setIsModal}
                children={<Form setIsModal={setIsModal} />}
              />
            )}
            <Post data={data} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
