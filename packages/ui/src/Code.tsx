import React from 'react';

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-2 bg-gray-200 font-bold rounded-md text-gray-800 font-sans">
      {children}
    </code>
  );
}
