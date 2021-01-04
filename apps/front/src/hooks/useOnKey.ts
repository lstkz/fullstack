import React from 'react';

interface UseOnKeyOptions {
  key: string;
  fn: () => void;
  isEnabled?: boolean;
}

export function useOnKey(options: UseOnKeyOptions) {
  const { key, fn, isEnabled = true } = options;
  React.useLayoutEffect(() => {
    if (!isEnabled) {
      return;
    }
    const onKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === key) {
        fn();
      }
    };
    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [key, fn, isEnabled]);
}
