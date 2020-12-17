import { api } from 'src/services/api';
import React from 'react';
import { IDLE_TIMEOUT } from 'src/config';

const DEFAULT_EVENTS = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mouseWheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
];

const PING_INTERVAL = 30 * 1000;

export function useVMPing(isReady: boolean) {
  const [isIdle, setIsIdle] = React.useState(false);
  React.useEffect(() => {
    if (!isReady || isIdle) {
      return;
    }
    let lastPing = 0;

    const onActivity = () => {
      if (lastPing + PING_INTERVAL > Date.now()) {
        return;
      }
      lastPing = Date.now();
      api.vm_pingVM().catch(console.error);
    };
    DEFAULT_EVENTS.forEach(name => {
      document.addEventListener(name, onActivity);
    });
    const targetIdleTimeout = IDLE_TIMEOUT - 60 * 1000;
    const idleTimeoutId = setInterval(() => {
      if (lastPing && lastPing + targetIdleTimeout < Date.now()) {
        setIsIdle(true);
      }
    }, 1000);
    return () => {
      clearInterval(idleTimeoutId);
      DEFAULT_EVENTS.forEach(name => {
        document.removeEventListener(name, onActivity);
      });
    };
  }, [isReady, isIdle]);
  return { isIdle };
}
