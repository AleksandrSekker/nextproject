import Container from '../components/Layout/Container/Container';
import { auth } from '../firebase';
import Layout from '../layout/Layout';
import Button from '../components/UI/buttons/Button';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <Layout title="Home">
      <Container>
        <div>
          <Container>
            <Link href={`user/${auth.currentUser?.uid}`}>
              <div>
                <Button color="purple" children="My page" />
              </div>
            </Link>
          </Container>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
