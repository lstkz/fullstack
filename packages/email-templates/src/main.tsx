import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('root')!;

const render = (scrollY?: number) => {
  const App = require('./App').App;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  try {
    ReactDOM.render(<App />, MOUNT_NODE, () => {
      if (scrollY != null) {
        requestAnimationFrame(() => {
          window.scroll({
            top: scrollY,
            behavior: 'auto',
          });
        });
      }
    });
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
    throw e;
  }
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const scrollY = window.scrollY;
    render(scrollY);
  });
}
render();
