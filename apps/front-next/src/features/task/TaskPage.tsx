import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { TaskHeader } from './TaskHeader';
import SplitPane from 'react-split-pane';
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

function useDragging() {
  const [isDragging, setIsDragging] = React.useState(false);

  const defaultSize = React.useMemo(() => {
    if (IS_SSR) {
      return 300;
    }
    return Number(localStorage.taskPaneWidth) || 300;
  }, []);

  return {
    isDragging,
    splitPaneProps: {
      defaultSize: defaultSize,
      onDragStarted: () => {
        setIsDragging(true);
      },
      onDragFinished: (newSize: number) => {
        localStorage.taskPaneWidth = newSize;
        setIsDragging(false);
      },
    },
  };
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
  const { isDragging, splitPaneProps } = useDragging();
  const { isIdle } = useVMPing(isReady);
  const targetUrl = useUrlWithSecrets(vmUrl);
  if (isIdle) {
    return <IdleScreen />;
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
          pointerEvents: isDragging ? 'none' : undefined,
        }}
        src={targetUrl}
      />
    );
  };

  const renderDetails = () => {
    if (!details) {
      return (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      );
    }
    return (
      <SplitPane
        {...splitPaneProps}
        split="vertical"
        minSize={0}
        resizerStyle={{
          width: 5,
          cursor: 'col-resize',
          background: 'white',
          zIndex: 2,
        }}
      >
        <div
          className="bg-white p-4 h-full overflow-auto"
          data-test="task-details"
        >
          {details}
        </div>
        <div className="h-full flex-1">{renderIframe()}</div>
      </SplitPane>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <TaskHeader />
      <div className="flex-1 relative">{renderDetails()}</div>
    </div>
  );
}
