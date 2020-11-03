import { useEffect, useState } from 'react';

function getBodySize() {
  if (typeof document === 'undefined') {
    return 1800;
  }
  return document.body.clientWidth;
}

export function useBodyWidth() {
  const [windowSize, setWindowSize] = useState(getBodySize());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return null!;
    }
    const handleResize = () => {
      setWindowSize(getBodySize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function parseQueryString(qs: string | null | undefined) {
  return (qs || '')
    .replace(/^\?/, '')
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      if (key) {
        params[key] = value ? decodeURIComponent(value) : '';
      }
      return params;
    }, {} as Record<string, string>);
}
