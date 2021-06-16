import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Form from '../components/FormForPost/Form';
import Loader from '../components/Loader/Loader';
import Post from '../components/Post/Post';
import { firestore } from '../firebase';
import Layout from '../layout/Layout';
import styles from '../scss/feed.module.scss';
const IndexPage = () => {
  const [data, setData] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [isChange, setIsChange] = useState(true);

  const fetchData = async () => {
    try {
      const dataFromFirebase = await firestore.collection('biography').get();
      setData(
        dataFromFirebase.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoaded(true);
    } catch (error) {
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
    return () => setLoaded(false);
  }, [isChange]);

  return (
    <Layout title="Home">
      <Container>
        <div>
          {isError && <div>Error</div>}
          {!loaded ? (
            <Loader />
          ) : (
            <div className={styles.center}>
              <Form isChange={isChange} setIsChange={setIsChange} />
              <Post data={data} isChange={isChange} setIsChange={setIsChange} />
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
