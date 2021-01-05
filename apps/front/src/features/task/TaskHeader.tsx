import * as React from 'react';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModuleTaskDetails } from 'shared';
import {
  DropdownPopup,
  MenuItem,
  MenuSeparator,
} from 'src/components/DropdownPopup';
import { MenuDropdown } from 'src/components/MenuDropdown';
import { VoidLink } from 'src/components/VoidLink';
import { TaskHeaderContainer } from './TaskHeaderContainer';
import { useTaskHintActions } from './TaskHintModule';
import { useTaskVideoSolutionActions } from './TaskVideoSolutionModule';

interface TaskHeaderProps {
  task: ModuleTaskDetails;
}

export function TaskHeader(props: TaskHeaderProps) {
  const { task } = props;
  const { showHint } = useTaskHintActions();
  const { showVideoSolution } = useTaskVideoSolutionActions();
  return (
    <TaskHeaderContainer moduleId={task.moduleId}>
      <div className="py-1">
        {task.isSolved && (
          <div className="px-3 py-1 text-xs bg-green-800 rounded-md text-white">
            Rozwiązano
          </div>
        )}
      </div>
      <MenuDropdown
        testId="header-menu"
        dropdown={
          <DropdownPopup>
            {task.hasHint && (
              <>
                <MenuItem data-test="hint-btn" onClick={showHint}>
                  Pokaż wskazówkę
                </MenuItem>
                <MenuSeparator />
              </>
            )}

            {task.hasVideoSolution && (
              <>
                <MenuItem data-test="solution-btn" onClick={showVideoSolution}>
                  Pokaż rozwiązanie
                </MenuItem>
              </>
            )}
            {/* <MenuSeparator /> */}
            {/* <MenuItem data-test="report-issue-btn">Zgłoś problem</MenuItem> */}
          </DropdownPopup>
        }
      >
        <VoidLink type="primary" className="ml-2 text-white px-1">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </VoidLink>
      </MenuDropdown>
    </TaskHeaderContainer>
  );
}
