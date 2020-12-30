import React from 'react';
import { useErrorModalActions } from 'src/features/ErrorModalModule';

export function useCustomEffect(fn: () => void | Promise<void>, deps?: any[]) {
  const errorModalActions = useErrorModalActions();
  React.useEffect(() => {
    Promise.resolve()
      .then(fn)
      .catch(e => {
        errorModalActions.show(e);
      });
  }, deps);
}
