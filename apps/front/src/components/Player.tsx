import React from 'react';
import Vimeo, { VimeoVideoQuality } from '@vimeo/player';
import { VideoUpload } from 'shared';
import { useLayoutEffectFix } from 'src/hooks/useLayoutEffectFix';
import { IS_SSR } from 'src/config';

interface PlayerProps {
  sources: VideoUpload[];
  onEnd?: () => void;
}

declare module 'react' {
  interface SourceHTMLAttributes<T> extends React.HTMLAttributes<T> {
    size?: number;
  }
}

function useSize() {
  const [size, setSize] = React.useState({
    width: IS_SSR ? 1240 : document.body.clientWidth,
    height: IS_SSR ? 1240 : document.body.clientHeight,
  });

  React.useEffect(() => {
    const onResize = () => {
      setSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return React.useMemo(() => {
    let w = size.width;
    let h = size.height * 0.8;
    const proportion = 16 / 9;
    if (w > h * proportion) {
      w = h * proportion;
    }
    if (h > w / proportion) {
      h = w / proportion;
    }
    return {
      width: Math.round(w),
      height: Math.round(h),
    };
  }, [size]);
}

export function Player(props: PlayerProps) {
  const { sources, onEnd } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<Vimeo | null>(null);
  const size = useSize();

  useLayoutEffectFix(() => {
    const source = sources.find(x => x.type === 'vimeo');
    if (!source) {
      throw new Error('Vimeo url not found');
    }
    const getSettings: () => {
      quality: VimeoVideoQuality | undefined;
      playbackRate: number;
    } = () => {
      try {
        return JSON.parse(localStorage.vimeoSettings);
      } catch {
        return {
          quality: undefined,
          playbackRate: 1,
        };
      }
    };
    const vimeoSettings = getSettings();
    const saveSettings = () => {
      localStorage.vimeoSettings = JSON.stringify(vimeoSettings);
    };
    const player = new Vimeo(ref.current!, {
      url: source.url,
      width: size.width,
      height: size.height,
      quality: vimeoSettings.quality,
    });
    void player.setPlaybackRate(vimeoSettings.playbackRate);
    if (onEnd) {
      player.on('ended', onEnd);
    }
    player.on('playbackratechange', (data: { playbackRate: number }) => {
      vimeoSettings.playbackRate = data.playbackRate;
      saveSettings();
    });
    player.on('qualitychange', (data: { quality: VimeoVideoQuality }) => {
      vimeoSettings.quality = data.quality;
      saveSettings();
    });
    playerRef.current = player;
    return () => {
      void player.destroy();
    };
  }, []);

  React.useEffect(() => {
    const player = playerRef.current;
    if (player) {
      const node = (player as any).element as HTMLIFrameElement;
      node.width = size.width.toString();
      node.height = size.height.toString();
    }
  }, [size]);

  return <div ref={ref}></div>;
}
