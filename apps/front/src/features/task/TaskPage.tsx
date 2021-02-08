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
import { TaskVideoSolutionModule } from './TaskVideoSolutionModule';
import { TaskSummary } from './TaskSummary';
import { HeadTitle } from 'src/components/HeadTitle';
import { track } from 'src/track';

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
  const [task, setTask] = useTaskUpdates(props.task);
  React.useEffect(() => {
    track({
      type: 'task_viewed',
      moduleId: task.moduleId,
      taskId: task.id,
    });
  }, []);

  useReportPracticeTime(task, isReady && vmUrl != null && !isIdle);
  if (isIdle) {
    return (
      <IdleScreen header={<TaskHeaderContainer moduleId={task.moduleId} />} />
    );
  }

  const renderIframe = () => {
    if (!isReady || !vmUrl) {
      return <VMLoadingScreen isReady={isReady} />;
    }
    return <VMIframe vmUrl={vmUrl} />;
  };

  return (
    <TaskHintModule task={task} setTask={setTask}>
      <HeadTitle title={task.name} />
      <TaskVideoSolutionModule task={task} setTask={setTask}>
        <div className="flex h-full flex-col" style={{ minWidth: 800 }}>
          <SolvedModal task={task} />
          <HighlightStyles />
          <TaskHeader task={task} />
          <div className="flex-1 relative">
            <TaskSplitPane
              details={
                <>
                  <TaskSummary task={task} />
                  {details ?? (
                    <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
                  )}
                </>
              }
              ide={renderIframe()}
            />
          </div>
        </div>
      </TaskVideoSolutionModule>
    </TaskHintModule>
  );
}
