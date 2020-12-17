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

interface TaskPageProps {
  task: ModuleTaskDetails;
  isReady: boolean;
  vmUrl: string | null;
}

if (typeof window !== 'undefined') {
  window.React = React;
  window.Prism = Prism;
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
  const { isIdle } = useVMPing(isReady);
  if (isIdle) {
    return <IdleScreen />;
  }

  const renderIframe = () => {
    if (!isReady || !vmUrl) {
      return <VMLoadingScreen isReady={isReady} />;
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
        // src="http://localhost:8080/#/Users/sky/work/fullstack/fullstack-repo/content/modules/1-ts-basics/task-1/source"
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
