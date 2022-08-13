import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// Mount functions to start app the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// If we are in development and it isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container,
// and we should export the mount function
export { mount };
