import React from 'react';
import { Badge } from 'src/components/Badge';
import { Heading } from 'src/components/Heading';

interface ModuleMediaProps {
  aboveText: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  button: React.ReactNode;
  type: 'success' | 'fail' | 'pending';
}

export function ModuleMedia(props: ModuleMediaProps) {
  const { footer, title, aboveText, button, type } = props;
  return (
    <div className="grid grid-cols-3 relative mb-4 shadow-sm bg-white border border-gray-200 rounded-xl py-4 px-5">
      <div className="flex col-span-2 items-center">
        <Badge
          dot
          type={
            type === 'pending'
              ? 'secondary'
              : type === 'fail'
              ? 'danger'
              : 'success'
          }
        />
        <div className="ml-3">
          <div className="text-sm">{aboveText}</div>
          <Heading type={6} className="leading-5">
            {title}
          </Heading>
          {footer}
        </div>
      </div>
      <div className="flex justify-end items-center">{button}</div>
    </div>
  );
}
