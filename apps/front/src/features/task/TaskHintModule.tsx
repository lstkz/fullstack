import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Button } from 'src/components/Button';
import { ConfirmModal } from 'src/components/ConfirmModal';
import { Modal } from 'src/components/Modal';
import { SimpleModal } from 'src/components/SimpleModal';
import { api } from 'src/services/api';
import { useImmer } from 'use-immer';
import { useErrorModalActions } from '../ErrorModalModule';

interface Actions {
  showHint: () => void;
}

interface State {
  isConfirmOpen: boolean;
  hintHtml: string | null;
  isHintOpen: boolean;
  isWaitOpen: boolean;
  remainingTime: number;
  needConfirm: boolean;
}

const TaskHintContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface TaskHintProps {
  children: React.ReactNode;
  task: ModuleTaskDetails;
}

export function TaskHintModule(props: TaskHintProps) {
  const { children, task } = props;
  const { show: showError } = useErrorModalActions();
  const [state, setState] = useImmer<State>({
    isConfirmOpen: false,
    hintHtml: null,
    isHintOpen: false,
    isWaitOpen: false,
    remainingTime: 0,
    needConfirm: !task.isHintOpened,
  });

  React.useEffect(() => {
    if (task.isSolved) {
      setState(draft => {
        draft.needConfirm = false;
      });
    }
  }, [task.isSolved]);

  const closeConfirm = () =>
    setState(draft => {
      draft.isConfirmOpen = false;
    });

  const closeWait = () =>
    setState(draft => {
      draft.isWaitOpen = false;
    });

  const closeHint = () =>
    setState(draft => {
      draft.isHintOpen = false;
    });

  const loadHint = async () => {
    try {
      const result = await api.module_getTaskHint(task.moduleId, task.id);
      if (result.type === 'wait') {
        setState(draft => {
          draft.isWaitOpen = true;
          draft.remainingTime = Math.ceil(result.remainingTime / 1000 / 60);
        });
      } else {
        const html = await fetch(result.url).then(res => res.text());
        setState(draft => {
          draft.isHintOpen = true;
          draft.needConfirm = false;
          draft.hintHtml = html;
        });
      }
    } catch (e) {
      showError(e);
    } finally {
      setState(draft => {
        draft.isConfirmOpen = false;
      });
    }
  };

  const actions = React.useMemo<Actions>(
    () => ({
      showHint: () => {
        if (state.needConfirm) {
          setState(draft => {
            draft.isConfirmOpen = true;
          });
        } else {
          void loadHint();
        }
      },
    }),
    [state.needConfirm]
  );

  const {
    isConfirmOpen,
    hintHtml,
    isHintOpen,
    isWaitOpen,
    remainingTime,
  } = state;

  return (
    <>
      <Modal
        isOpen={isHintOpen}
        close={closeHint}
        footer={
          <Button
            testId="close-btn"
            size="small"
            type="secondary"
            onClick={closeHint}
          >
            Zamknij
          </Button>
        }
      >
        <div dangerouslySetInnerHTML={{ __html: hintHtml ?? '' }}></div>
      </Modal>
      <SimpleModal
        bgColor="primary"
        isOpen={isWaitOpen}
        close={closeWait}
        icon={<FontAwesomeIcon size="4x" icon={faInfoCircle} />}
        title="Wskazówka jeszcze niedostępna"
        description={
          <div>
            Wskazówka jest dostępna dopiero po 1 godzinie od otwarcia zadania.
            <br />
            Postaraj się rozwiązać zadanie samodzielnie.
            <br />
            Wskazówka będzie dostępna za <strong>{remainingTime}</strong> min.
          </div>
        }
      />
      <ConfirmModal
        title="Potwierdź pokazanie wskazówki"
        isOpen={isConfirmOpen}
        close={closeConfirm}
        confirm={loadHint}
      >
        Jeżeli zdecydujesz się na pokazanie wskazówki, maksymalna możliwa ilość
        punktów do zdobycia będzie wynosić <strong>50</strong> zamiast{' '}
        <strong>100</strong>.
        <br />
        Jesteś pewien?
      </ConfirmModal>

      <TaskHintContext.Provider
        value={{
          state,
          actions,
        }}
      >
        {children}
      </TaskHintContext.Provider>
    </>
  );
}

function useContext() {
  const context = React.useContext(TaskHintContext);
  if (!context) {
    throw new Error('TaskHintContext is not set');
  }
  return context;
}

export function useTaskHintActions() {
  return useContext().actions;
}
