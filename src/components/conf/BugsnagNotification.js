/* eslint-disable consistent-return */
import React from 'react';
import getConfig from 'next/config';

import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

const { publicRuntimeConfig } = getConfig();
const ignorePatterns = [/ResizeObserver/];

Bugsnag.start({
  apiKey: publicRuntimeConfig.BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
  enabledReleaseStages: ['production', 'stable', 'staging'],
  onError: event => {
    if (ignorePatterns.some(re => re.test(event.errors[0].errorMessage))) return false;
  }
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

export default ErrorBoundary;
