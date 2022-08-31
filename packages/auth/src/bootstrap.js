import React from 'react';
import { createMemoryHistory, createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';

import App from './App';

// Mount functions to start app the app
// we get this onNavigate
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // when we run this mfe in isolation we create browserHistory instead memory history
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  // passed this cb from container app and trigger this callback when history change inside Marketing MFE
  // implicitly passing a history object in onNavigate cb
  if (onNavigate) {
    history.listen((locationState) => onNavigate(locationState));
  }
  const onParentNavigate = (location) => {
    const {pathname: nextPathName} = location;
    const {pathname} = history.location;
    if (pathname !== nextPathName) {
      history.push(nextPathName);
    }
  };

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);
  return {onParentNavigate};
};

// If we are in development and it isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  // when we run this mfe in isolation we create browserHistory instead memory history
  if (devRoot) {
    mount(devRoot, {defaultHistory: createBrowserHistory()});
  }
}

// We are running through container,
// and we should export the mount function
export { mount };
