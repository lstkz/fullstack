import Prism from 'prismjs';
import React from 'react';

interface HighlightProps {
  code: string;
  lang: 'html' | 'css' | 'js';
  maxHeight?: number;
}

export function Highlight(props: HighlightProps) {
  const ref = React.useRef<HTMLElement>(null!);
  const { code, lang, maxHeight } = props;

  const html = React.useMemo(() => {
    return Prism.highlight(code, Prism.languages[lang], lang);
  }, [code, lang]);

  return (
    <div className="relative">
      <div
        style={maxHeight ? { maxHeight } : undefined}
        className="rounded-md overflow-auto"
      >
        <pre className="prismjs">
          <code
            ref={ref}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          ></code>
        </pre>
      </div>
    </div>
  );
}
