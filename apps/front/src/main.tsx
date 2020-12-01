import React from 'react';
import ReactDOM from 'react-dom';
import { setGlobalExport } from './global-exports';
import { Hmr, startHmr, TypelessContext } from 'typeless';
import { registry } from './registry';
import { GlobalStyle } from 'ui';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { addTypelessExt } from './common/typeless-ext';
import { BUGSNAG_API_KEY } from './config';

const MOUNT_NODE = document.getElementById('root')!;

setGlobalExport();
addTypelessExt();

if (BUGSNAG_API_KEY && BUGSNAG_API_KEY !== '-1') {
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  });
}

const ErrorBoundary =
  Bugsnag.getPlugin('react')?.createErrorBoundary(React as any) ??
  (({ children }: { children: React.ReactElement }) => children);

(window as any)._registry = registry;
const render = (scrollY?: number) => {
  const App = require('./components/App').App;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  try {
    ReactDOM.render(
      <ErrorBoundary>
        <Hmr>
          <TypelessContext.Provider value={{ registry }}>
            <>
              <GlobalStyle />
              <App />
            </>
          </TypelessContext.Provider>
        </Hmr>
      </ErrorBoundary>,
      MOUNT_NODE,
      () => {
        if (scrollY != null) {
          requestAnimationFrame(() => {
            window.scroll({
              top: scrollY,
              behavior: 'auto',
            });
          });
        }
      }
    );
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
    throw e;
  }
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const scrollY = window.scrollY;
    startHmr();
    render(scrollY);
  });
}
if (window.location.pathname === '/github') {
  if (window.opener) {
    const code = /code=(\w+)/.exec(window.location.search)![1];
    (window.opener as any).githubCallback(code);
    window.close();
  }
} else if (window.location.pathname === '/google') {
  if (window.opener) {
    const token = /access_token=([^&]+)/.exec(window.location.hash)![1];
    (window.opener as any).googleCallback(token);
    window.close();
  }
} else {
  render();
}
