import React from 'react';
import Plyr from 'plyr';
import { VideoUpload } from 'shared';
import { useLayoutEffectFix } from 'src/hooks/useLayoutEffectFix';

interface PlayerProps {
  sources: VideoUpload[];
  onEnd?: () => void;
}

declare module 'react' {
  interface SourceHTMLAttributes<T> extends React.HTMLAttributes<T> {
    size?: number;
  }
}

export function Player(props: PlayerProps) {
  const { sources, onEnd } = props;
  const ref = React.useRef<HTMLVideoElement>(null);

  const resolutionMap: Record<string, number> = {
    '1080': 1080,
    '720': 720,
    '1080p': 1080,
    '720p': 720,
    '5k': 2880,
    '4k': 2160,
  };

  useLayoutEffectFix(() => {
    const player = new Plyr(ref.current!, {
      ratio: '16:9',
      displayDuration: true,
    });
    if (onEnd) {
      player.on('ended', onEnd);
    }
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
