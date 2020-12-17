import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TaskHeader } from './TaskHeader';

export function IdleScreen() {
  return (
    <div className="flex h-full flex-col">
      <TaskHeader />
      <div className="flex text-center justify-center flex-1 text-gray-700 text-2xl items-center">
        <div>
          <FontAwesomeIcon
            className="text-warning"
            size="3x"
            icon={faExclamationCircle}
          />
          <div className="mt-5 mb-12">
            Maszyna zastopowana z powodu nieaktywności. <br />
            Odśwież stronę, żeby załadować zadanie ponownie.
          </div>
        </div>
      </div>
    </div>
  );
}
