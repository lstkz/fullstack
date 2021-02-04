import React from 'react';
import { PlayerModal } from 'src/components/PlayerModal';
import { useImmer } from 'use-immer';
import { useModulePageActions, useOptionalLesson } from './ModulePage';
import { Player } from '../../components/Player';
import { useOnKey } from 'src/hooks/useOnKey';
import { useRouter } from 'next/router';
import { Button } from 'src/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { track } from 'src/track';

interface Actions {
  show: (lessonId: number) => void;
  hide: () => void;
}
interface State {
  isOpen: boolean;
  lessonId: number | null;
}

const LessonModalContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface LessonModalProps {
  moduleId: string;
  children: React.ReactNode;
}

export function LessonModalModule(props: LessonModalProps) {
  const { children, moduleId } = props;
  const [state, setState] = useImmer<State>({ isOpen: false, lessonId: null });
  const router = useRouter();
  const actions = React.useMemo<Actions>(
    () => ({
      hide: () => {
        const newQuery = {
          ...(router.query ?? {}),
        };
        delete newQuery.lesson;
        void router.push({
          query: newQuery,
        });
      },
      show: lessonId => {
        void router.push({
          query: {
            ...(router.query ?? {}),
            lesson: lessonId,
          },
        });
      },
    }),
    []
  );

  React.useEffect(() => {
    setState(draft => {
      const lessonId = Number(router.query?.lesson);
      draft.isOpen = !!lessonId;
      draft.lessonId = lessonId;
    });
  }, [router.query?.lesson]);

  const { isOpen, lessonId } = state;

  const lesson = useOptionalLesson(lessonId);
  const nextLesson = useOptionalLesson(lessonId ? lessonId + 1 : null);
  useOnKey({
    isEnabled: isOpen,
    key: 'Escape',
    fn: actions.hide,
  });

  const { markLessonWatched } = useModulePageActions();

  React.useEffect(() => {
    if (isOpen && lesson) {
      track({
        type: 'lesson_viewed',
        moduleId: moduleId,
        lessonId: lesson.id,
      });
    }
  }, [isOpen, lessonId]);

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
        <PlayerModal
          header={
            <>
              Lekcja {lesson.id}: {lesson.name}
            </>
          }
          footer={
            <>
              <div className="flex justify-end mt-2">
                {lesson.isWatched && nextLesson && (
                  <Button
                    type="secondary"
                    onClick={() => {
                      actions.show(nextLesson.id);
                    }}
                  >
                    Lekcja {nextLesson.id}
                    <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
                  </Button>
                )}
              </div>
            </>
          }
          isOpen={isOpen}
          close={actions.hide}
        >
          <Player
            key={lesson.id}
            sources={lesson.sources}
            onEnd={() => {
              if (!lesson.isWatched) {
                track({
                  type: 'lesson_watched',
                  moduleId: module.id,
                  lessonId: lesson.id,
                });
              }
              markLessonWatched(lesson.id);
            }}
          />
        </PlayerModal>
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
