import * as React from 'react';
import { FooterCopyright } from './FooterCopyright';

export function Footer() {
  return (
    <div className="bg-dark text-gray-600">
      <div className="container">
        <FooterCopyright />
      </div>
    </div>
  );
}
