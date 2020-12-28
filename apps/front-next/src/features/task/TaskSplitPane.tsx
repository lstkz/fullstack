import React from 'react';
import SplitPane from 'react-split-pane';
import { IS_SSR } from 'src/config';

interface TaskSplitPaneProps {
  details: React.ReactNode;
  ide: React.ReactNode;
}

export function TaskSplitPane(props: TaskSplitPaneProps) {
  const { details, ide } = props;
  const [isDragging, setIsDragging] = React.useState(false);

  const defaultSize = React.useMemo(() => {
    if (IS_SSR) {
      return 300;
    }
    return Number(localStorage.taskPaneWidth) || 300;
  }, []);

  return (
    <SplitPane
      defaultSize={defaultSize}
      onDragStarted={() => {
        setIsDragging(true);
      }}
      onDragFinished={(newSize: number) => {
        localStorage.taskPaneWidth = newSize;
        setIsDragging(false);
      }}
      split="vertical"
      minSize={0}
      resizerStyle={{
        width: 5,
        cursor: 'col-resize',
        background: 'white',
        zIndex: 2,
      }}
    >
      <div
        className="bg-white p-4 h-full overflow-auto"
        data-test="task-details"
      >
        {details}
      </div>
      <div
        className="h-full flex-1"
        style={{
          pointerEvents: isDragging ? 'none' : undefined,
        }}
      >
        {ide}
      </div>
    </SplitPane>
  );
}
