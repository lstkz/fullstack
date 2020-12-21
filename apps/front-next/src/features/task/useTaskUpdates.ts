import React from 'react';
import { ModuleTask } from 'shared';
import WS from 'reconnecting-websocket';
import { API_URL, IS_SSR } from 'src/config';
import { getAccessToken } from 'src/services/Storage';

export function useTaskUpdates(task: ModuleTask) {
  if (IS_SSR) {
    return;
  }
  React.useEffect(() => {
    const socketUrl =
      API_URL.replace(/^http/, 'ws') +
      '/?token=' +
      encodeURIComponent(getAccessToken() ?? '');
    const ws = new WS(socketUrl);
    ws.onmessage = e => {
      console.log(e);
    };
    ws.addEventListener('message', e => {
      console.log(e);
    });
  }, []);
}
