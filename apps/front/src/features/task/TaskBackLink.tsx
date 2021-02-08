import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { createUrl } from 'src/common/url';

interface TaskBackLinkProps {
  moduleId: string;
}

export function TaskBackLink(props: TaskBackLinkProps) {
  const { moduleId } = props;
  return (
    <Link
      href={createUrl({
        name: 'module',
        id: moduleId,
      })}
    >
      <a className=" text-black text-xs hover:underline leading-none mt-4 block">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="ml-1">Wróć</span>
      </a>
    </Link>
  );
}
