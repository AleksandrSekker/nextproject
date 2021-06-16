import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';

type Props = {
  children?: ReactNode;
  title?: string;
};
const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <style jsx global>{`
        body {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
