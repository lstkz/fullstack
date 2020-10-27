import * as React from 'react';
import styled, { css } from 'styled-components';
import { socialLinks } from '../const';
import { Theme } from '../Theme';
import { FbIcon, GitHubIcon, LiIcon, TwitterIcon, YtIcon } from './SocialIcons';

interface SocialButtonProps {
  className?: string;
  type: 'li' | 'twitter' | 'fb' | 'yt' | 'gh';
  big?: boolean;
}

const _SocialButton = (props: SocialButtonProps) => {
  const { className, type, big } = props;
  const scale = big ? 1.3 : 1;
  return (
    <a className={className} href={socialLinks[type]} target="_blank">
      {type === 'li' ? (
        <LiIcon scale={scale} />
      ) : type === 'fb' ? (
        <FbIcon scale={scale} />
      ) : type === 'yt' ? (
        <YtIcon scale={scale} />
      ) : type === 'twitter' ? (
        <TwitterIcon scale={scale} />
      ) : type === 'gh' ? (
        <GitHubIcon scale={scale} />
      ) : null}
    </a>
  );
};

export const SocialButton = styled(_SocialButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: rgba(51, 54, 69, 0.15);
  border-radius: 9px;
  path {
    fill: ${Theme.textDark};
  }
  &:focus,
  &:hover {
    background: ${Theme.primary};
    outline: none;
    path {
      fill: white;
    }
  }
  &:focus {
    box-shadow: ${Theme.primary50} 0px 0px 0px 3px;
  }

  ${props =>
    props.big &&
    css`
      width: 51px;
      height: 51px;
      background: rgb(75, 78, 91);
      path {
        fill: white;
      }
    `}
`;
