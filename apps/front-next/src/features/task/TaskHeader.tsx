import { Logo } from 'src/components/Logo';
import * as React from 'react';
import { ModuleTaskDetails } from 'shared';

interface TaskHeaderProps {
  task: ModuleTaskDetails;
}

export function TaskHeader(props: TaskHeaderProps) {
  const { task } = props;
  return (
    <div className="flex justify-between items-center h-8 px-4 bg-dark">
      <Logo type="light" titleClassName="text-xl " />
      <div className="py-1">
        {task.isSolved && (
          <div className="px-3 py-1 text-xs bg-green-800 rounded-md text-white">
            Rozwiązano
          </div>
        )}
      </div>
    </div>
  );
}
