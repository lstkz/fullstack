import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { TaskHeader } from './TaskHeader';

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

  const renderDetails = () => {
    if (!details) {
      return <Loader />;
    }
    return (
      <div className="flex h-full" style={{ minWidth: 1000 }}>
        <div className="bg-white p-4 h-full" style={{ width: 400 }}>
          {details}
        </div>
        <div className="h-full flex-1">
          <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://test-vm.styx-dev.com/?folder=/home/ubuntu/task1"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <TaskHeader />
      {renderDetails()}
    </div>
  );
}
