import React from 'react';
import Plyr from 'plyr';
import { VideoUpload } from 'shared';

interface PlayerProps {
  sources: VideoUpload[];
}

declare module 'react' {
  interface SourceHTMLAttributes<T> extends React.HTMLAttributes<T> {
    size?: number;
  }
}

export function Player(props: PlayerProps) {
  const { sources } = props;

  const ref = React.useRef<HTMLVideoElement>(null);

  const resolutionMap: Record<string, number> = {
    '1080': 1080,
    '720': 720,
    '1080p': 1080,
    '720p': 720,
    '5k': 2880,
  };

  React.useLayoutEffect(() => {
    const player = new Plyr(ref.current!, {
      ratio: '16:9',
    });
    return () => {
      player.destroy();
    };
  }, []);

  return (
    <video
      ref={ref}
      controls
      style={{
        maxHeight: '80vh',
      }}
    >
      {sources.map(item => (
        <source
          key={item.url}
          src={item.url}
          size={resolutionMap[item.resolution]}
          type="video/mp4"
        ></source>
      ))}
    </video>
  );
}
