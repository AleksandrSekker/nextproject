import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import styles from './scss/layout.module.scss';
type Props = {
  children?: ReactNode;
  title?: string;
};
const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className={styles.flex}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
