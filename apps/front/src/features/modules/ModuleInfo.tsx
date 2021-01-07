import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { createUrl } from 'src/common/url';
import { TsIcon } from 'src/icons/TsIcon';
import { ProgressBar } from 'src/components/ProgressBar';
import { Module } from 'shared';
import Link from 'next/link';
import { Heading } from 'src/components/Heading';
import { Button } from 'src/components/Button';
import { Badge } from 'src/components/Badge';

interface ModuleInfoProps {
  className?: string;
  module: Module;
}

interface StatProps {
  icon: IconDefinition;
  text: React.ReactNode;
}

function Stat({ icon, text }: StatProps) {
  return (
    <div className="mx-2">
      <FontAwesomeIcon icon={icon} className="text-blue" /> {text}
    </div>
  );
}

export const ModuleInfo = (props: ModuleInfoProps) => {
  const { module } = props;
  const heading = <Heading type={5}>{module.name}</Heading>;
  return (
    <div className="rounded-xl bg-white p-7 pb-0 border border-gray-200 shadow-sm mt-8 first:mt-0">
      <div className="md:grid grid-cols-6 mb-4">
        <div className="col-span-5">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center mr-4">
              <TsIcon className="w-8 h-8" />
            </div>
            {module.isPending ? (
              <>
                {heading}
                <Badge type="warning" className="ml-4">
                  wkrótce
                </Badge>
              </>
            ) : (
              <Link
                href={createUrl({
                  name: 'module',
                  id: module.id,
                })}
                data-test="title"
              >
                <a>{heading}</a>
              </Link>
            )}
          </div>
          <div>{module.description}</div>
        </div>
        <div className="flex justify-end items-center mt-4 md:m-0">
          {!module.isPending && (
            <Button
              testId="show-btn"
              type="secondary"
              href={createUrl({ name: 'module', id: module.id })}
            >
              Pokaż
            </Button>
          )}
        </div>
      </div>
      {!module.isPending && (
        <div className="sep py-4 text-xs text-gray-600 font-light">
          <div className="md:grid grid-cols-2">
            <div className="flex items-end">
              <Stat
                icon={faGraduationCap}
                text={`${module.totalLessons} lekcji`}
              />
              <Stat icon={faCode} text={`${module.totalTasks} zadań`} />
              <Stat
                icon={faHourglassHalf}
                text={`${module.estimatedPracticeTimeHours} godzin praktyki`}
              />
            </div>
            <div className="mt-4 md:m-0">
              <ProgressBar title="Postęp" progress={module.progress} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
