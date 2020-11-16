import React from 'react';
import ReactDOM from 'react-dom';
import StyledComponents from 'styled-components';

const global = window as any;

export function setGlobalExport() {
  global.React = React;
  global.ReactDOM = ReactDOM;
  global.StyledComponents = StyledComponents;
}
