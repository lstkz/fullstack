import React from 'react';
import {
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
  MjmlRaw,
} from 'mjml-react';

interface MjmlHeadProps {
  preview?: string;
}

export function EmailHead(props: MjmlHeadProps) {
  const { preview } = props;
  return (
    <MjmlHead>
      <MjmlRaw>
        <meta name="color-scheme" content="only" />
      </MjmlRaw>
      <MjmlFont
        name="Nunito Sans"
        href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,800&display=swap"
      />
      <MjmlTitle>Fullstack.pl</MjmlTitle>
      {preview && <MjmlPreview>{preview}</MjmlPreview>}
      <MjmlAttributes>
        <MjmlAll padding="0" fontFamily="Nunito Sans, sans-serif" />
      </MjmlAttributes>
    </MjmlHead>
  );
}
