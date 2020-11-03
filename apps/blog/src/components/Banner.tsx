import * as React from 'react';
import styled from 'styled-components';
import { TABLET } from '../const';
import { Theme } from '../Theme';
import { GradientBg } from './GradientBg';

interface BannerProps {
  className?: string;
}

const Slogan = styled.div`
  font-weight: 800;
  font-size: 36px;
  color: white;
  line-height: 48px;
  span {
    color: ${Theme.primary};
  }
  z-index: 2;

  ${TABLET} {
    font-size: 54px;
    line-height: 68px;
  }
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
  height: 350px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${TABLET} {
    height: 450px;
  }
`;
