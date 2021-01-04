import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { useModule } from './ModulePage';
import { Stat } from './Stat';

export function ModuleSummary() {
  const module = useModule();
  const stats = React.useMemo(() => {
    return {
      lessonsWatched: module.lessons.filter(x => x.isWatched).length,
      lessonsTotal: module.lessons.length,
      tasksDone: module.tasks.filter(x => x.isSolved).length,
      tasksTotal: module.tasks.length,
      practiceTime: '25 godzin',
    };
  }, [module]);
  return (
    <div className="bg-white border border-gray-200 my-4 p-7 rounded-xl shadow-sm">
      <Heading type={5}>Podsumowanie</Heading>
      <div className="grid md:grid-cols-3 gap-8 mt-4 gap-y-4">
        <Stat
          icon={<FontAwesomeIcon icon={faGraduationCap} />}
          title="Obejrzane lekcje"
          value={`${stats.lessonsWatched}/${stats.lessonsTotal}`}
        />
        <Stat
          icon={<FontAwesomeIcon icon={faCode} />}
          title="Zrobione zadania"
          value={`${stats.tasksDone}/${stats.tasksTotal}`}
        />
        <Stat
          icon={<FontAwesomeIcon icon={faHourglassHalf} />}
          title="Spędzony czas na praktyce"
          value={stats.practiceTime}
        />
      </div>
    </div>
  );
}
