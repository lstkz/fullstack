import React from 'react';
import _NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ErrorModalModule } from 'src/features/ErrorModalModule';
import { SubscriptionModalsModule } from 'src/features/SubscriptionModalsModule';
import { AuthModule } from 'src/features/AuthModule';
import { User } from 'shared';
import mixpanel from 'mixpanel-browser';
import { createSSRClient } from 'src/common/helper';
import '../styles/global.css';
import '../styles/react-select.css';
import '../styles/plyr.css';
import useScrollRestoration from 'src/hooks/useScrollRestoration';
import { API_URL, MIXPANEL_API_KEY } from 'src/config';
import { ErrorBoundary } from 'src/bug-report';

config.autoAddCss = false;

interface GlobalProps {
  initialUser: User | null;
}

if (MIXPANEL_API_KEY !== '-1') {
  mixpanel.init(
    MIXPANEL_API_KEY,
    {
      api_host: API_URL + '/track',
    },
    ''
  );
}

function App({
  Component,
  pageProps,
  initialUser,
  router,
}: AppProps & GlobalProps) {
  useScrollRestoration(router);
  return (
    <ErrorBoundary>
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
        <link
          href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <title>Fullstack</title>
        <link rel="icon" type="image/png" href="/favicon-32x32.png?2" />
      </Head>
      <AuthModule initialUser={initialUser}>
        <ErrorModalModule>
          <SubscriptionModalsModule>
            <Component {...pageProps} />
          </SubscriptionModalsModule>
        </ErrorModalModule>
      </AuthModule>
      <div id="portals" />
    </ErrorBoundary>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  const api = createSSRClient(ctx);
  if (!api.getToken()) {
    return { initialUser: null };
  }
  const user = await api.user_getMe().catch(e => {
    console.error(e);
    return null;
  });
  return {
    initialUser: user,
  };
};

export default App;
