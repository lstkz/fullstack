import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { api } from 'src/services/api';

export function useVMWaiter(initial: {
  task: ModuleTaskDetails;
  vmUrl: string | null;
  isReady: boolean;
}) {
  const { task } = initial;
  const [vmUrl, setVmUrl] = React.useState(initial.vmUrl);
  const [isReady, setIsReady] = React.useState(initial.isReady);

  React.useEffect(() => {
    if (isReady) {
      return;
    }
    const waitReadyId = setInterval(async () => {
      try {
        const ret = await api.vm_assignVM();
        if (ret.isReady) {
          clearInterval(waitReadyId);
          setIsReady(true);
        }
      } catch (e) {
        console.error('failed to check vm status', e);
      }
    }, 1000);

    return () => {
      clearInterval(waitReadyId);
    };
  }, [isReady]);

  React.useEffect(() => {
    if (!isReady || vmUrl) {
      return;
    }
    const waitUrlId = setInterval(async () => {
      try {
        const ret = await api.vm_prepareFolder(task.moduleId, task.id);
        if (ret.url) {
          clearInterval(waitUrlId);
          setVmUrl(ret.url);
        }
      } catch (e) {
        console.error('failed to prepare folder', e);
      }
    }, 1000);

    return () => {
      clearInterval(waitUrlId);
    };
  }, [isReady, vmUrl]);

  return { vmUrl, isReady };
}
