import React from 'react';
import { ModuleDetails } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { HeadTitle } from 'src/components/HeadTitle';
import { api } from 'src/services/api';
import { track } from 'src/track';
import { useImmer } from 'use-immer';
import { LessonModalModule } from './LessonModalModule';
import { LessonsSection } from './LessonsSection';
import { ModuleSummary } from './ModuleSummary';
import { TasksSection } from './TasksSection';

interface Actions {
  markLessonWatched: (lessonId: number) => void;
}

interface State {
  module: ModuleDetails;
}

const ModulePageContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface ModulePageProps {
  module: ModuleDetails;
}

export function ModulePage(props: ModulePageProps) {
  const [state, setState] = useImmer<State>({ module: props.module });
  const { module } = state;
  React.useEffect(() => {
    track({
      type: 'module_viewed',
      moduleId: module.id,
    });
  }, []);

  const actions = React.useMemo<Actions>(
    () => ({
      markLessonWatched: lessonId => {
        setState(draft => {
          draft.module.lessons.forEach(lesson => {
            if (lesson.id === lessonId) {
              lesson.isWatched = true;
            }
          });
        });
        api
          .module_updateLessonProgress(module.id, lessonId, {
            isWatched: true,
          })
          .catch(console.error);
      },
    }),
    []
  );

  return (
    <Dashboard>
      <HeadTitle title={module.name} />
      <ModulePageContext.Provider
        value={{
          state,
          actions,
        }}
      >
        <LessonModalModule moduleId={module.id}>
          <div className="container mt-4" data-test="module-page">
            <Heading type={3} className="my-8">
              {module.name}
            </Heading>
            <ModuleSummary />
            <div className="grid md:grid-cols-2 gap-7">
              <LessonsSection />
              <TasksSection />
            </div>
          </div>
        </LessonModalModule>
      </ModulePageContext.Provider>
    </Dashboard>
  );
}

function useContext() {
  const context = React.useContext(ModulePageContext);
  if (!context) {
    throw new Error('ModulePageContext is not set');
  }
  return context;
}

export function useModulePageActions() {
  return useContext().actions;
}

export function useOptionalLesson(lessonId: number | null) {
  const { lessons } = useContext().state.module;
  return React.useMemo(() => {
    return lessons.find(x => x.id === lessonId);
  }, [lessonId, lessons]);
}

export function useLesson(lessonId: number) {
  return useOptionalLesson(lessonId)!;
}

export function useModule() {
  return useContext().state.module;
}
