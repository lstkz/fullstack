import {
  faArrowRight,
  faCheckCircle,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Modal } from 'src/components/Modal';

interface SolvedModalProps {
  task: ModuleTaskDetails;
}

export function SolvedModal(props: SolvedModalProps) {
  const { task } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const originalIsSolved = React.useMemo(() => task.isSolved, []);

  React.useEffect(() => {
    if (!originalIsSolved && task.isSolved) {
      setIsOpen(true);
    }
  }, [task.isSolved]);

  const close = () => setIsOpen(false);

  return (
    <Modal
      bgColor="success"
      isOpen={isOpen}
      close={close}
      header={<>Rozwiązano poprawnie</>}
      testId="solved-modal"
    >
      <div className="text-center py-6">
        <FontAwesomeIcon size="4x" icon={faCheckCircle} />
        <Heading type={4} className="text-center mt-4 mb-3" white>
          Gratulacje!
        </Heading>
        <div className="mb-4">
          Udało Ci się rozwiąząć zadanie poprawnie.
          {!task.isExample && (
            <>
              <br />
              Ilość punktów: <strong>{task.score}</strong>.
            </>
          )}
        </div>
        <Button
          testId="solution-btn"
          size="small"
          type="secondary"
          onClick={() => {
            //
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faVideo} />
          Obejrzyj rozwiązanie wzorcowe
        </Button>
        {task.nextTask && (
          <>
            <div className="my-4">Lub przejdź do następnego zadania:</div>
            <Button
              href={createUrl({
                name: 'task',
                id: task.moduleId,
                taskId: task.nextTask.id,
              })}
              testId="next-task-btn"
              size="small"
              type="secondary"
            >
              Zadanie {task.nextTask.id}: {task.nextTask.name}{' '}
              {task.nextTask.isExample && '(Przykład)'}
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
