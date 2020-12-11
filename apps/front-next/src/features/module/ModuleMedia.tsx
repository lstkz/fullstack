import React from 'react';
import { Badge } from 'src/components/Badge';
import { HeadingNext } from 'src/components/HeadingNext';

interface ModuleMediaProps {
  aboveText: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  button: React.ReactNode;
}

export function ModuleMedia(props: ModuleMediaProps) {
  const { footer, title, aboveText, button } = props;
  return (
    <div className="grid grid-cols-3 relative mb-4 shadow-sm bg-white border border-gray-200 rounded-xl py-4 px-5">
      <div className="flex col-span-2 items-center">
        <Badge dot type="secondary" />
        <div className="ml-3">
          <div className="text-sm">{aboveText}</div>
          <HeadingNext type={6} className="leading-5">
            {title}
          </HeadingNext>
          {footer}
        </div>
      </div>
      <div className="flex justify-end items-center">{button}</div>
    </div>
  );
}
