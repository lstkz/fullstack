import React from 'react';
import { GlobalStyles } from 'src/components/GlobalStyles';
import _NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="description"
          content="Naucz się programować od zera. Kompletne kursy progrmowania z wielogodzinną praktyką."
        />
        <meta name="google" content="notranslate" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,800&display=swap"
          rel="stylesheet"
        />
        <title>Fullstack</title>
        <link rel="icon" type="image/png" href="/favicon-32x32.png?2" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = ({ ctx }: AppContext) => {
  return {};
};

export default App;
