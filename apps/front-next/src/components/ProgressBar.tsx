import * as React from 'react';

interface ProgressBarProps {
  className?: string;
  title?: React.ReactNode;
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const { className, progress, title } = props;
  return (
    <div className={className}>
      <div className="text-gray-600 text-xs uppercase">{title}</div>
      <div className="flex items-center -mt-1">
        <div className="flex h-1.5 flex-auto font-xs bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-blue transition-all"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + '%' }}
          />
        </div>
        <div className="text-sm ml-4 text font-semibold text-right text-blue">
          {progress}%
        </div>
      </div>
    </div>
  );
}
