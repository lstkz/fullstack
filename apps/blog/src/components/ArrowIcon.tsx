import React from 'react';
import { Theme } from '../Theme';

export function ArrowIcon() {
  return (
    <svg width={10} height={16} viewBox="0 0 10 16" fill="none">
      <path
        d="M6.367 8L.592 2.225l1.65-1.65L9.667 8l-7.425 7.425-1.65-1.65L6.367 8z"
        fill={Theme.primary}
      />
    </svg>
  );
}
