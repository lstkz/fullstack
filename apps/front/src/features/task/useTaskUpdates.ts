import React from 'react';
import { AppSocketMsg, ModuleTaskDetails } from 'shared';
import WS from 'reconnecting-websocket';
import { API_URL } from 'src/config';
import { getAccessToken } from 'src/services/Storage';
import { useImmer } from 'use-immer';

export function useTaskUpdates(defaultTask: ModuleTaskDetails) {
  const [task, setTask] = useImmer(defaultTask);

  React.useLayoutEffect(() => {
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
          setTask(draft => {
            draft.isSolved = true;
          });
        }
      }
    };
    ws.addEventListener('message', onMessage);
    return () => {
      ws.removeEventListener('message', onMessage);
    };
  }, []);

  return [task, setTask] as const;
}
