import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/AuthApp';

const AuthApp = ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory();

  // destructure path name from history object
  const onNavigateCb = ({pathname: nextPathName}) => {
    const {pathname} = history.location;
    if (pathname !== nextPathName) {
      history.push(nextPathName);
    }
  };

  const onSignInCb = () => {
    onSignIn();
  };
  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: onNavigateCb,
      onSignIn: onSignInCb,
    });
    history.listen((location) => onParentNavigate(location));
  }, []);


  return <div ref={ref} />;
};

export default AuthApp;
