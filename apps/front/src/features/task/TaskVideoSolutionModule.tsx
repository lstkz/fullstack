import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ModuleTaskDetails, VideoUpload } from 'shared';
import { ConfirmModal } from 'src/components/ConfirmModal';
import { Player } from 'src/components/Player';
import { PlayerModal } from 'src/components/PlayerModal';
import { SimpleModal } from 'src/components/SimpleModal';
import { api } from 'src/services/api';
import { Updater, useImmer } from 'use-immer';
import { useErrorModalActions } from '../ErrorModalModule';

interface Actions {
  showVideoSolution: () => void;
}

interface State {
  isConfirmOpen: boolean;
  isHintRequiredOpen: boolean;
  isWaitOpen: boolean;
  remainingTime: number;
  isSolutionOpen: boolean;
  sources: VideoUpload[];
}

const TaskVideoSolutionContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface TaskVideoSolutionProps {
  children: React.ReactNode;
  task: ModuleTaskDetails;
  setTask: Updater<ModuleTaskDetails>;
}

export function TaskVideoSolutionModule(props: TaskVideoSolutionProps) {
  const { children, task, setTask } = props;
  const { show: showError } = useErrorModalActions();
  const [state, setState] = useImmer<State>({
    isConfirmOpen: false,
    isHintRequiredOpen: false,
    isWaitOpen: false,
    remainingTime: 0,
    isSolutionOpen: false,
    sources: [],
  });

  const closeHintRequired = () =>
    setState(draft => {
      draft.isHintRequiredOpen = false;
    });

  const closeWait = () =>
    setState(draft => {
      draft.isWaitOpen = false;
    });

  const closeConfirm = () =>
    setState(draft => {
      draft.isConfirmOpen = false;
    });

  const closeSolution = () =>
    setState(draft => {
      draft.isSolutionOpen = false;
    });

  const loadSolution = async () => {
    try {
      const result = await api.module_getTaskVideoSolution(
        task.moduleId,
        task.id
      );
      if (result.type === 'wait') {
        setState(draft => {
          draft.isWaitOpen = true;
          draft.remainingTime = Math.ceil(result.remainingTime / 1000 / 60);
        });
      } else {
        setState(draft => {
          draft.isSolutionOpen = true;
          draft.sources = result.sources;
        });
        setTask(draft => {
          draft.isSolutionOpened = true;
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
      showVideoSolution: () => {
        if (task.isSolutionOpened || task.isSolved || task.isExample) {
          void loadSolution();
        } else {
          if (!task.isHintOpened) {
            setState(draft => {
              draft.isHintRequiredOpen = true;
            });
          } else {
            setState(draft => {
              draft.isConfirmOpen = true;
            });
          }
        }
      },
    }),
    [task.isSolutionOpened, task.isSolved, task.isHintOpened]
  );

  const {
    isConfirmOpen,
    isWaitOpen,
    remainingTime,
    isHintRequiredOpen,
    isSolutionOpen,
    sources,
  } = state;

  return (
    <>
      {sources.length > 0 && (
        <PlayerModal
          header={<>Rozwiązanie: {task.name}</>}
          isOpen={isSolutionOpen}
          close={closeSolution}
        >
          <Player sources={sources} />
        </PlayerModal>
      )}
      <SimpleModal
        testId="hint-required-modal"
        bgColor="primary"
        isOpen={isHintRequiredOpen}
        close={closeHintRequired}
        icon={<FontAwesomeIcon size="4x" icon={faInfoCircle} />}
        title="Przeczytaj wskazówkę"
        description={
          <div>
            Rozwiązanie jest dostępne dopiero przeczytaniu wskazówki.
            <br />
            Postaraj się rozwiązać zadanie najpierw ze wskazówką.
          </div>
        }
      />
      <SimpleModal
        testId="solution-pending-modal"
        bgColor="primary"
        isOpen={isWaitOpen}
        close={closeWait}
        icon={<FontAwesomeIcon size="4x" icon={faInfoCircle} />}
        title="Rozwiązanie jeszcze niedostępne"
        description={
          <div>
            Rozwiązanie jest dostępne dopiero po 1 godzinie od otwarcia
            wskazówki.
            <br />
            Postaraj się rozwiązać zadanie najpierw ze wskazówką.
            <br />
            Rozwiązanie będzie dostępne za <strong>{remainingTime}</strong> min.
          </div>
        }
      />

      <ConfirmModal
        testId="confirm-modal"
        title="Potwierdź pokazanie rozwiązania"
        isOpen={isConfirmOpen}
        close={closeConfirm}
        confirm={loadSolution}
      >
        Jeżeli zdecydujesz się na pokazanie rozwiązania, maksymalna możliwa
        ilość punktów do zdobycia będzie wynosić <strong>1</strong> zamiast{' '}
        <strong>50</strong>.
        <br />
        Jesteś pewien?
      </ConfirmModal>
      <TaskVideoSolutionContext.Provider
        value={{
          state,
          actions,
        }}
      >
        {children}
      </TaskVideoSolutionContext.Provider>
    </>
  );
}

function useContext() {
  const context = React.useContext(TaskVideoSolutionContext);
  if (!context) {
    throw new Error('TaskVideoSolutionContext is not set');
  }
  return context;
}

export function useTaskVideoSolutionActions() {
  return useContext().actions;
}
