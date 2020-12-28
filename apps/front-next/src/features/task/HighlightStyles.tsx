const prismColors = {
  char: '#D8DEE9',
  comment: '#B2B2B2',
  keyword: '#c5a5c5',
  lineHighlight: '#353b45', // colors.dark + extra lightness
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#88C6BE',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
};

export function HighlightStyles() {
  return (
    <style global jsx>{`
      code[class='prismjs'],
      pre[class='prismjs'] {
        color: #fff;
        background: none;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
          monospace;
        font-weight: 400;
        font-size: 14px;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
      }

      /* Code blocks */
      pre[class='prismjs'] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
        border-radius: 0.3em;
      }

      :not(pre) > code[class='prismjs'],
      pre[class='prismjs'] {
        background: rgb(40, 44, 52);
        border-radius: 10px;
      }

      /* Inline code */
      :not(pre) > code[class='prismjs'] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: ${prismColors.comment};
      }

      .token.property,
      .token.number,
      .token.function-name,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: ${prismColors.primitive};
      }

      .token.boolean {
        color: ${prismColors.boolean};
      }

      .token.tag {
        color: ${prismColors.tag};
      }

      .token.string {
        color: ${prismColors.string};
      }

      .token.punctuation {
        color: ${prismColors.punctuation};
      }

      .token.selector,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: ${prismColors.char};
      }

      .token.function {
        color: ${prismColors.function};
      }

      .token.operator,
      .token.entity,
      .token.url,
      .token.variable {
        color: ${prismColors.variable};
      }

      .token.attr-value {
        color: ${prismColors.string};
      }

      .token.keyword {
        color: ${prismColors.keyword};
      }
    `}</style>
  );
}
