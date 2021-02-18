import React from 'react';
import _NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ErrorModalModule } from 'src/features/ErrorModalModule';
import { AuthModule } from 'src/features/AuthModule';
import { User } from 'shared';
import mixpanel from 'mixpanel-browser';
import { createSSRClient } from 'src/common/helper';
import '../styles/global.css';
import '../styles/react-select.css';
import '../styles/plyr.css';
import useScrollRestoration from 'src/hooks/useScrollRestoration';
import { API_URL, IS_REAL_PROD, MIXPANEL_API_KEY } from 'src/config';
import { ErrorBoundary } from 'src/bug-report';
import { ConfirmEmailChecker } from 'src/features/ConfirmEmailChecker';

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
        {IS_REAL_PROD && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-582094465"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); 
              gtag('config', 'AW-582094465');
            `,
              }}
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '764473161151688');
        fbq('track', 'PageView');`,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src="https://www.facebook.com/tr?id=764473161151688&ev=PageView&noscript=1"
              />
            </noscript>
          </>
        )}
      </Head>
      <AuthModule initialUser={initialUser}>
        <ErrorModalModule>
          <Component {...pageProps} />
          <ConfirmEmailChecker />
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
