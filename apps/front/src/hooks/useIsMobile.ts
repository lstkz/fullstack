import { useState } from 'react';
import { useLayoutEffectFix } from './useLayoutEffectFix';

export function useIsMobile(breakpoint = 991) {
  const [windowSize, setWindowSize] = useState(
    typeof window === 'undefined' ? 1000 : document.body.clientWidth
  );

  useLayoutEffectFix(() => {
    const handleResize = () => {
      setWindowSize(document.body.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize <= breakpoint;
}
