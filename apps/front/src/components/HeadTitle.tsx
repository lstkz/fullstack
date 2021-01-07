import Head from 'next/head';
import React from 'react';

interface HeadTitleProps {
  title: string;
}

export function HeadTitle(props: HeadTitleProps) {
  const { title } = props;
  return (
    <Head>
      <title>{title} - Fullstack</title>
    </Head>
  );
}
