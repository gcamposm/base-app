import { useEffect } from 'react';

const CacheVersion = () => {
  /* 
    Handles hard reload when new version of suite is build
    TODO: handle new versions from build id instead of manually
   */

  useEffect(() => {
    const version = 'mU-XMJgl4ThoC9wM70g8i%';
    const buildVersion = localStorage.getItem('b_suite');

    if (!buildVersion || buildVersion !== version) {
      localStorage.setItem('b_suite', version);
      window.location.reload(true);
    }
  }, []);

  return <div />;
};

export default CacheVersion;
