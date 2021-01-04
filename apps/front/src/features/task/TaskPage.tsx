import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { TaskHeader } from './TaskHeader';
import { useVMWaiter } from './useVMWaiter';
import { useVMPing } from './useVMPing';
import { VMLoadingScreen } from './VMLoadingScreen';
import { IdleScreen } from './IdleScreen';
import { useTaskUpdates } from './useTaskUpdates';
import { TaskSplitPane } from './TaskSplitPane';
import { HighlightStyles } from './HighlightStyles';
import { VMIframe } from './VMIframe';
import { SolvedModal } from './SolvedModal';
import { useDetails } from './useDetails';
import { useReportPracticeTime } from './useReportPracticeTime';
import { TaskHintModule } from './TaskHintModule';
import { TaskHeaderContainer } from './TaskHeaderContainer';

export interface TaskPageProps {
  task: ModuleTaskDetails;
  isReady: boolean;
  vmUrl: string | null;
  detailsHtml: string;
}

export function TaskPage(props: TaskPageProps) {
  const { detailsHtml } = props;
  const { vmUrl, isReady } = useVMWaiter(props);
  const details = useDetails(props.task);
  const { isIdle } = useVMPing(isReady);
  const task = useTaskUpdates(props.task);

  useReportPracticeTime(task, isReady && vmUrl != null && !isIdle);
  if (isIdle) {
    return <IdleScreen header={<TaskHeaderContainer />} />;
  }

  const renderIframe = () => {
    if (!isReady || !vmUrl) {
      return <VMLoadingScreen isReady={isReady} />;
    }
    return <VMIframe vmUrl={vmUrl} />;
  };

  return (
    <div className="flex h-full flex-col">
      <SolvedModal task={task} />
      <HighlightStyles />
      <TaskHintModule task={task}>
        <TaskHeader task={task} />
      </TaskHintModule>
      <div className="flex-1 relative">
        <TaskSplitPane
          details={
            <>
              {details ?? (
                <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
              )}
            </>
          }
          ide={renderIframe()}
        />
      </div>
    </div>
  );
}
