import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Button } from 'src/components/Button';
import { useTaskVideoSolutionActions } from './TaskVideoSolutionModule';

interface TaskSummaryProps {
  task: ModuleTaskDetails;
}

export function TaskSummary(props: TaskSummaryProps) {
  const { task } = props;
  const { showVideoSolution } = useTaskVideoSolutionActions();
  if (!task.isSolved && !task.isExample) {
    return null;
  }

  const watchBtn = (
    <div className="flex items-center">
      <Button
        testId="watch-btn"
        size="small"
        type="secondary"
        onClick={showVideoSolution}
      >
        <FontAwesomeIcon className="mr-2" icon={faVideo} />
        Obejrzyj
      </Button>
    </div>
  );
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 text-sm">
      {task.isSolved && !task.isExample && (
        <div className="flex justify-between">
          <div>
            Zdobyte punkty:{' '}
            <strong data-test="score">{task.score ?? '-'}</strong>
            <br />
            Możesz teraz obejrzeć rozwiązanie wzorcowe przez mentora.
          </div>
          {watchBtn}
        </div>
      )}
      {task.isExample && (
        <div className="flex justify-between">
          <div>
            To jest zadanie przykładowe.
            <br />
            Możesz obejrzeć rozwiązanie lub spróbować rozwiązać zadanie
            samodzielnie.
          </div>
          {watchBtn}
        </div>
      )}
    </div>
  );
}
