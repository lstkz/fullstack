import * as React from 'react';

interface StatProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
}

export function Stat(props: StatProps) {
  const { icon, title, value } = props;
  return (
    <div className="flex p-2 items-center bg-secondary rounded-xl">
      <div className="inline-flex items-center justify-center rounded-md w-12 h-12 text-primary bg-white text-lg shadow-sm">
        {icon}
      </div>
      <div className="pl-4">
        <div className="text-xs font-light text-gray-600">{title}</div>
        <div className="font-bold text-heading">{value}</div>
      </div>
    </div>
  );
}
