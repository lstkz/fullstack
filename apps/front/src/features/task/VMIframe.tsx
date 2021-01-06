import React from 'react';
import {
  API_URL,
  IS_TEST,
  LOCAL_VM_BASE_PATH,
  LOCAL_VM_URL,
  USE_LOCAL_VM,
} from 'src/config';
import { useLayoutEffectFix } from 'src/hooks/useLayoutEffectFix';
import { getAccessToken } from 'src/services/Storage';

interface VMIframeProps {
  vmUrl: string;
}

export function VMIframe(props: VMIframeProps) {
  const { vmUrl } = props;
  const [targetUrl, setTargetUrl] = React.useState<string | undefined>(
    undefined
  );

  useLayoutEffectFix(() => {
    let [base, hash] = vmUrl.split('#');
    if (USE_LOCAL_VM && !IS_TEST) {
      base = LOCAL_VM_URL;
      hash = hash
        .replace('/home/ubuntu', LOCAL_VM_BASE_PATH)
        .replace(/\d+$/, 'task-$&/source');
    }
    const url = `${base}?apiUrl=${encodeURIComponent(
      API_URL
    )}&token=${encodeURIComponent(getAccessToken() ?? '')}#${hash}`;
    setTargetUrl(url);
  }, []);

  return (
    <iframe
      data-test="task-iframe"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1F1F1F',
        border: 0,
      }}
      src={targetUrl}
    />
  );
}
