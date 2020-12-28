import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { TaskHeader } from './TaskHeader';
import Prism from 'prismjs';
import { useVMWaiter } from './useVMWaiter';
import { useVMPing } from './useVMPing';
import { VMLoadingScreen } from './VMLoadingScreen';
import { IdleScreen } from './IdleScreen';
import {
  API_URL,
  IS_SSR,
  LOCAL_VM_BASE_PATH,
  LOCAL_VM_URL,
  USE_LOCAL_VM,
} from 'src/config';
import { getAccessToken } from 'src/services/Storage';
import { useTaskUpdates } from './useTaskUpdates';
import { TaskSplitPane } from './TaskSplitPane';

interface TaskPageProps {
  task: ModuleTaskDetails;
  isReady: boolean;
  vmUrl: string | null;
}

if (!IS_SSR) {
  window.React = React;
  window.Prism = Prism;
}

function useDetails(task: ModuleTaskDetails) {
  const [details, setDetails] = React.useState<React.ReactNode | null>(null);
  React.useEffect(() => {
    if (IS_SSR) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = task.detailsUrl;
    (window as any).TaskJSONP = (module: any) => {
      setDetails(module.Details);
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return details;
}

export function useUrlWithSecrets(url: string | null) {
  return React.useMemo(() => {
    if (!url || IS_SSR) {
      return url;
    }
    let [base, hash] = url.split('#');
    if (USE_LOCAL_VM) {
      base = LOCAL_VM_URL;
      hash = hash
        .replace('/home/ubuntu', LOCAL_VM_BASE_PATH)
        .replace(/\d+$/, 'task-$&/source');
    }
    return `${base}?apiUrl=${encodeURIComponent(
      API_URL
    )}&token=${encodeURIComponent(getAccessToken() ?? '')}#${hash}`;
  }, [url]);
}

export function TaskPage(props: TaskPageProps) {
  const { vmUrl, isReady } = useVMWaiter(props);
  const details = useDetails(props.task);
  const { isIdle } = useVMPing(isReady);
  const targetUrl = useUrlWithSecrets(vmUrl);
  const task = useTaskUpdates(props.task);
  const header = <TaskHeader task={task} />;
  if (isIdle) {
    return <IdleScreen header={header} />;
  }

  const renderIframe = () => {
    if (!isReady || !targetUrl) {
      return <VMLoadingScreen isReady={isReady} />;
    }
    return (
      <iframe
        data-test="task-iframe"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1F1F1F',
          border: 0,
        }}
        src={targetUrl}
      />
    );
  };

  return (
    <div className="flex h-full flex-col">
      {header}
      <div className="flex-1 relative">
        {details ? (
          <TaskSplitPane details={details} ide={renderIframe()} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
