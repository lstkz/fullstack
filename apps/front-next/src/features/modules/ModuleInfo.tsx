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

  return (
    <div className="rounded-xl bg-white p-7 pb-0 border border-gray-200 shadow-sm">
      <div className="md:grid grid-cols-6">
        <div className="col-span-5">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center mr-4">
              <TsIcon className="w-8 h-8" />
            </div>
            <Link
              href={createUrl({
                name: 'module',
                id: module.id,
              })}
              data-test="title"
            >
              <Heading type={5}>{module.name}</Heading>
            </Link>
          </div>
          <div>{module.description}</div>
        </div>
        <div className="flex justify-end items-center mt-4 md:m-0">
          <Button
            testId="show-btn"
            type="secondary"
            href={createUrl({ name: 'module', id: module.id })}
          >
            Pokaż
          </Button>
        </div>
      </div>
      <div className="sep py-4 mt-4 text-xs text-gray-600 font-light">
        <div className="md:grid grid-cols-2">
          <div className="flex items-end">
            <Stat icon={faGraduationCap} text="20 lekcji" />
            <Stat icon={faCode} text="30 zadań" />
            <Stat icon={faHourglassHalf} text="20 godzin praktyki" />
          </div>
          <div className="mt-4 md:m-0">
            <ProgressBar title="Postęp" progress={25} />
          </div>
        </div>
      </div>
    </div>
  );
};
