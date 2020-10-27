import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../Theme';
import { GradientBg } from './GradientBg';

interface BannerProps {
  className?: string;
}

const Slogan = styled.div`
  font-weight: 800;
  font-size: 54px;
  color: white;
  line-height: 68px;
  span {
    color: ${Theme.primary};
  }
  z-index: 2;
`;

const _Banner = (props: BannerProps) => {
  const { className } = props;
  return (
    <GradientBg className={className}>
      <Slogan>
        Zostań <span>full-stack</span> <br /> developerem
      </Slogan>
    </GradientBg>
  );
};

export const Banner = styled(_Banner)`
  display: flex;
  height: 450px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
