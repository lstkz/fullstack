import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { Stat } from './Stat';

export function ModuleSummary() {
  return (
    <div className="bg-white border border-gray-200 my-4 p-7 rounded-xl shadow-sm">
      <Heading type={5}>Podsumowanie</Heading>
      <div className="grid md:grid-cols-3 gap-8 mt-4 gap-y-4">
        <Stat
          icon={<FontAwesomeIcon icon={faGraduationCap} />}
          title="Obejrzane lekcje"
          value="2/15"
        />
        <Stat
          icon={<FontAwesomeIcon icon={faCode} />}
          title="Zrobione zadania"
          value="12/20"
        />
        <Stat
          icon={<FontAwesomeIcon icon={faHourglassHalf} />}
          title="Spędzony czas na praktyce"
          value="25 godzin"
        />
      </div>
    </div>
  );
}
