import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import styles from './scss/layout.module.scss';
import PageAnimation from '../components/Layout/PageAnimation/PageAnimation';
type Props = {
  children?: ReactNode;
  title?: string;
};
const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <PageAnimation>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <div className={styles.flex}>
          <Sidebar />
          {children}
        </div>
        <Footer />
      </PageAnimation>
    </>
  );
};

export default Layout;
