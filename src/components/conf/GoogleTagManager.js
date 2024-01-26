import { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { GOOGLE_TM_ID } from '../../lib/googleTagManager';

const tagManagerArgs = {
  gtmId: GOOGLE_TM_ID
};

const GoogleTagManager = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      TagManager.initialize(tagManagerArgs);
      setReady(true);
    }
  }, []);

  return <div />;
};

export default GoogleTagManager;
