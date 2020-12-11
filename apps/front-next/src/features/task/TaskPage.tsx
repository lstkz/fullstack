import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { TaskHeader } from './TaskHeader';
import SplitPane from 'react-split-pane';

interface TaskPageProps {
  task: ModuleTaskDetails;
}

if (typeof window !== 'undefined') {
  window.React = React;
}

export function TaskPage(props: TaskPageProps) {
  const { task } = props;
  const [details, setDetails] = React.useState<React.FunctionComponent | null>(
    null
  );
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
  const [isDragging, setIsDragging] = React.useState(false);

  const defaultSize = React.useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return 300;
    }
    return Number(localStorage.taskPaneWidth) || 300;
  }, []);

  const renderDetails = () => {
    if (!details) {
      return <Loader />;
    }
    return (
      <SplitPane
        split="vertical"
        minSize={50}
        defaultSize={defaultSize}
        onDragStarted={() => {
          setIsDragging(true);
        }}
        onDragFinished={newSize => {
          localStorage.taskPaneWidth = newSize;
          setIsDragging(false);
        }}
        resizerStyle={{
          width: 5,
          cursor: 'col-resize',
          background: 'white',
        }}
      >
        <div className="bg-white p-4 h-full">{details}</div>
        <div className="h-full flex-1">
          <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              pointerEvents: isDragging ? 'none' : undefined,
            }}
            src="https://test-vm.styx-dev.com/?folder=/home/ubuntu/task1"
          />
        </div>
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
