import React from 'react';
import { ModuleTaskDetails } from 'shared';
import Prism from 'prismjs';
import { IS_SSR } from 'src/config';

if (!IS_SSR) {
  window.React = React;
  window.Prism = Prism;
}

export function useDetails(task: ModuleTaskDetails) {
  const [details, setDetails] = React.useState<React.ReactNode | null>(null);
  React.useLayoutEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = task.detailsUrl;
    (window as any).TaskJSONP = (module: any) => {
      setDetails(module.Details);
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return details;
}
