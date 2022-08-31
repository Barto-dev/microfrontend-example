import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'marketing/MarketingApp';

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      initialPath: history.location.pathname,
      // destructure path name from history object
      onNavigate: ({pathname: nextPathName}) => {
        const {pathname} = history.location;
        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
    });
    history.listen((location) => onParentNavigate(location))
  }, []);


  return <div ref={ref} />;
};

export default MarketingApp;
