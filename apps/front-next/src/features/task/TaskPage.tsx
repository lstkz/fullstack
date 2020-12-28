import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { TaskHeader } from './TaskHeader';
import Prism from 'prismjs';
import { useVMWaiter } from './useVMWaiter';
import { useVMPing } from './useVMPing';
import { VMLoadingScreen } from './VMLoadingScreen';
import { IdleScreen } from './IdleScreen';
import { IS_SSR } from 'src/config';
import { useTaskUpdates } from './useTaskUpdates';
import { TaskSplitPane } from './TaskSplitPane';
import { HighlightStyles } from './HighlightStyles';
import { VMIframe } from './VMIframe';

interface TaskPageProps {
  task: ModuleTaskDetails;
  isReady: boolean;
  vmUrl: string | null;
  detailsHtml: string;
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

export function TaskPage(props: TaskPageProps) {
  const { detailsHtml } = props;
  const { vmUrl, isReady } = useVMWaiter(props);
  const details = useDetails(props.task);
  const { isIdle } = useVMPing(isReady);
  const task = useTaskUpdates(props.task);
  const header = <TaskHeader task={task} />;
  if (isIdle) {
    return <IdleScreen header={header} />;
  }

  const renderIframe = () => {
    if (!isReady || !vmUrl) {
      return <VMLoadingScreen isReady={isReady} />;
    }
    return <VMIframe vmUrl={vmUrl} />;
  };
  return (
    <div className="flex h-full flex-col">
      <HighlightStyles />
      {header}
      <div className="flex-1 relative">
        <TaskSplitPane
          details={
            details ?? <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
          }
          ide={renderIframe()}
        />
      </div>
    </div>
  );
}
