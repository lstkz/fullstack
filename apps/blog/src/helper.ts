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
