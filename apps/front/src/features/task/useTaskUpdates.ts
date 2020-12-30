import React from 'react';
import { AppSocketMsg, ModuleTaskDetails } from 'shared';
import WS from 'reconnecting-websocket';
import { API_URL, IS_SSR } from 'src/config';
import { getAccessToken } from 'src/services/Storage';

export function useTaskUpdates(defaultTask: ModuleTaskDetails) {
  const [task, setTask] = React.useState(defaultTask);

  React.useEffect(() => {
    if (IS_SSR) {
      return;
    }
    const socketUrl =
      API_URL.replace(/^http/, 'ws') +
      '/?token=' +
      encodeURIComponent(getAccessToken() ?? '');
    const ws = new WS(socketUrl);
    const onMessage = (e: MessageEvent<any>) => {
      const msg = JSON.parse(e.data) as AppSocketMsg;
      if (msg.type === 'TaskSolved') {
        const { moduleId, taskId } = msg.payload;
        if (task.moduleId === moduleId && task.id === taskId) {
          setTask({
            ...task,
            isSolved: true,
          });
        }
      }
    };
    ws.addEventListener('message', onMessage);
    return () => {
      ws.removeEventListener('message', onMessage);
    };
  }, []);

  return task;
}
