import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import React from 'react';
import { BUGSNAG_API_KEY } from './config';

export const bugsnag =
  BUGSNAG_API_KEY !== '-1'
    ? Bugsnag.start({
        apiKey: BUGSNAG_API_KEY,
        plugins: [new BugsnagPluginReact()],
      })
    : null;

export const ErrorBoundary =
  BUGSNAG_API_KEY !== '-1'
    ? Bugsnag.getPlugin('react').createErrorBoundary(React)
    : function ({ children }: { children: React.ReactNode }) {
        return children;
      };
