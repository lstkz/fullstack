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
import { Modal } from 'src/components/Modal';
import { Button } from 'src/components/Button';

interface TaskHeaderProps {
  task: ModuleTaskDetails;
}

export function TaskHeader(props: TaskHeaderProps) {
  const { task } = props;
  const { showHint } = useTaskHintActions();
  const { showVideoSolution } = useTaskVideoSolutionActions();
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const closeHelp = () => setIsHelpOpen(false);
  return (
    <TaskHeaderContainer moduleId={task.moduleId}>
      <Modal
        testId="help-modal"
        isOpen={isHelpOpen}
        close={closeHelp}
        footer={
          <Button
            testId="close-btn"
            size="small"
            type="secondary"
            onClick={closeHelp}
          >
            Zamknij
          </Button>
        }
      >
        Jeżeli treść zadania nie jest jasne albo masz pytania, napisz na naszym
        Discordzie.
        <br />
        Powinieneś dostać zaproszenie na maila po wykupieniu subskrypcji.
        <br />
        <br />
        Jeżeli masz problemy techniczne ze środowiskiem albo znalazłeś błąd na
        stronie, napisz maila na{' '}
        <a href="mailto:support@fullstack.pl" target="_blank">
          support@fullstack.pl
        </a>
        .
      </Modal>
      <div className="py-1">
        {task.isSolved && (
          <div
            data-test="solved-badge"
            className="px-3 py-1 text-xs bg-green-800 rounded-md text-white"
          >
            Rozwiązano
          </div>
        )}
      </div>
      <MenuDropdown
        testId="task-help-menu"
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
            <MenuSeparator />
            <MenuItem
              data-test="report-issue-btn"
              onClick={() => setIsHelpOpen(true)}
            >
              Zgłoś problem
            </MenuItem>
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
