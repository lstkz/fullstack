import React from 'react';
import SplitPane from 'react-split-pane';

interface TaskSplitPaneProps {
  details: React.ReactNode;
  ide: React.ReactNode;
}

const DEFAULT_SIZE = 300;

export function TaskSplitPane(props: TaskSplitPaneProps) {
  const { details, ide } = props;
  const [isDragging, setIsDragging] = React.useState(false);
  const [size, setSize] = React.useState(DEFAULT_SIZE);

  if (typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      setSize(Number(localStorage.taskPaneWidth) || DEFAULT_SIZE);
    }, []);
  }

  return (
    <SplitPane
      size={size}
      onDragStarted={() => {
        setIsDragging(true);
      }}
      onDragFinished={(newSize: number) => {
        setSize(newSize);
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
