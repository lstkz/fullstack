import React from 'react';
import { cx } from 'src/common/helper';

interface ListGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ListGroup(props: ListGroupProps) {
  const { children, className } = props;
  return (
    <div
      className={cx('bg-white rounded-lg border border-gray-200', className)}
    >
      {children}
    </div>
  );
}

interface ListGroupItemProps {
  title: React.ReactNode;
  desc: React.ReactNode;
  right: React.ReactNode;
}

export function ListGroupItem(props: ListGroupItemProps) {
  const { title, desc, right } = props;
  return (
    <div className="px-6 py-4 first first:border-0 border-t border-gray-200">
      <div className="flex justify-between items-center">
        {title}
        {right}
      </div>
      <div className="text-sm mt-1 text-gray-600">{desc}</div>
    </div>
  );
}
