import React from 'react';
import Plyr from 'plyr';
import { VideoUpload } from 'shared';
import videojs from 'video.js';

interface PlayerProps {
  sources: VideoUpload[];
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
      displayDuration: true,
      // sources: sources.map(item => ({
      //   src: item.url,

      // })),
      ratio: '16:9',

      // fluid: true,
      // controls: true,
    });
    // return;
    // let player: VideoJsPlayer = null!;

    // void import('videojs-resolution-switcher').then(() => {
    //   // const player = new Plyr(ref.current!, {
    //   //   // sources: sources.slice(1).map(item => ({
    //   //   //   src: item.url,
    //   //   // })),
    //   //   // aspectRatio: '16:9',
    //   //   // fluid: true,
    //   //   // controls: true,
    //   // });
    //   player = videojs(ref.current!, {
    //     sources: sources.map(item => ({
    //       src: item.url,
    //       type: 'video/mp4',
    //       label: item.resolution,
    //       res: resolutionMap[item.resolution]!,
    //     })),
    //     aspectRatio: '16:9',
    //     fluid: true,
    //     // controls: true,
    //     plugins: {
    //       videoJsResolutionSwitcher: {
    //         default: '1080p', // Default resolution [{Number}, 'low', 'high'],
    //         dynamicLabel: true,
    //       },
    //     },
    //   });
    // });

    return () => {
      // player.dispose();
      player.destroy();
    };
  }, []);

  return (
    <div
      data-vjs-player
      className="max-h-full max-w-full"
      style={{ maxHeight: '80vh' }}
    >
      <video ref={ref} controls>
        {/* <source src={sources[0].url} type="video/mp4"></source> */}

        {sources.map(item => (
          <source
            key={item.url}
            src={item.url}
            size={resolutionMap[item.resolution]}
            type="video/mp4"
            // size={item.resolution === '5k' ? 5120 : item.resolution}
          ></source>
        ))}
      </video>
    </div>
  );
}
