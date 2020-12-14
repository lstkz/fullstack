import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { TaskHeader } from './TaskHeader';
import SplitPane from 'react-split-pane';
import Prism from 'prismjs';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { api } from 'src/services/api';

interface TaskPageProps {
  task: ModuleTaskDetails;
  isReady: boolean;
  vmUrl: string | null;
}

if (typeof window !== 'undefined') {
  window.React = React;
  window.Prism = Prism;
}

function useVMWaiter(initial: {
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
        const ret = await api.vm_checkVmStatus();
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

function useDetails(task: ModuleTaskDetails) {
  const [details, setDetails] = React.useState<React.ReactNode | null>(null);
  React.useEffect(() => {
    if (typeof window === 'undefined') {
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
    if (typeof localStorage === 'undefined') {
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

export function TaskPage(props: TaskPageProps) {
  const { vmUrl, isReady } = useVMWaiter(props);
  const details = useDetails(props.task);
  const { isDragging, splitPaneProps } = useDragging();
  const renderIframe = () => {
    if (!isReady || !vmUrl) {
      return (
        <div className="flex items-center justify-center h-full flex-col text-gray-800 pb-28">
          <SpinnerBoarder />
          <div className="text-xl mt-4">
            {!isReady ? (
              <>
                Przygotowywanie maszyny... <br />
                Może to potrwać kilka minut.
              </>
            ) : (
              <>Przygotowywanie zadania...</>
            )}
          </div>
        </div>
      );
    }
    return (
      <iframe
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1F1F1F',
          border: 0,
          pointerEvents: isDragging ? 'none' : undefined,
        }}
        src={vmUrl}
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
        <div className="bg-white p-4 h-full overflow-auto">{details}</div>
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
