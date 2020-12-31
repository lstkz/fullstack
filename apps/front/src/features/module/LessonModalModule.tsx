import React from 'react';
import { ModuleLesson } from 'shared';
import { Heading } from 'src/components/Heading';
import { Modal } from 'src/components/Modal';
import { useImmer } from 'use-immer';
import { Player } from './Player';

interface Actions {
  show: (lesson: ModuleLesson) => void;
  hide: () => void;
}
interface State {
  isOpen: boolean;
  lesson: ModuleLesson | null;
}

const LessonModalContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface LessonModalProps {
  children: React.ReactNode;
}

export function LessonModalModule(props: LessonModalProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>({ isOpen: false, lesson: null });
  const actions = React.useMemo<Actions>(
    () => ({
      hide: () =>
        setState(draft => {
          draft.isOpen = false;
        }),

      show: lesson => {
        setState(draft => {
          draft.isOpen = true;
          draft.lesson = lesson;
        });
      },
    }),
    []
  );
  const { isOpen, lesson } = state;
  React.useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        actions.hide();
      }
    };
    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [isOpen]);

  return (
    <div>
      <LessonModalContext.Provider
        value={{
          state,
          actions,
        }}
      >
        {children}
      </LessonModalContext.Provider>

      {lesson && (
        <Modal
          bgColor="dark-600"
          header={
            <Heading type={4} white className="px-6">
              Lekcja {lesson.id}: {lesson.name}
            </Heading>
          }
          size="full"
          isOpen={isOpen}
          close={actions.hide}
        >
          <div className="-m-6 bg-black" style={{ maxHeight: '80vh' }}>
            <Player sources={lesson.sources} />
          </div>
        </Modal>
      )}
    </div>
  );
}

function useContext() {
  const context = React.useContext(LessonModalContext);
  if (!context) {
    throw new Error('LessonModalContext is not set');
  }
  return context;
}

export function useLessonModalActions() {
  return useContext().actions;
}
