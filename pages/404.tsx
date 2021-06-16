import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import styles from '../scss/notFoundPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
const PageNotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);
  return (
    <Layout title="Page is not found">
      <div className={styles.page__container}>
        <div className={styles.main}>
          <h1 className={styles.h1}>
            4
            <span>
              <FontAwesomeIcon icon={faGhost} />
            </span>
            4
          </h1>
          <h2 className={styles.h2}>Error: 404 page not found</h2>
          <p className={styles.p}>
            Sorry, the page you're looking for cannot be accessed
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
