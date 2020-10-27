import { lighten } from 'color2k';
import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../Theme';
import { CloseIcon } from './CloseIcon';
import { MainMenu, MenuItem } from './MainMenu';
import { VoidLink } from './VoidLink';

interface MobileSidebarProps {
  className?: string;
  onClose(): void;
}

const Close = styled(VoidLink)`
  position: absolute;
  top: 40px;
  right: 30px;
`;

const Logo = styled.h2`
  margin: 0;
  margin-bottom: 40px;
  font-size: 45px;
  color: ${Theme.primary};
`;

const _MobileSidebar = (props: MobileSidebarProps) => {
  const { className, onClose } = props;
  return (
    <div className={className}>
      <Logo>Fullstack</Logo>
      <Close onClick={onClose} data-test="close">
        <CloseIcon scale={2} />
      </Close>
      <MainMenu />
    </div>
  );
};

const selectedColor = lighten(Theme.textDark, 0.1);

export const MobileSidebar = styled(_MobileSidebar)`
  display: block;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  background: ${Theme.textDark};
  padding: 30px;
  color: white;

  font-weight: 500;
  font-size: 19px;
  ${MainMenu} {
    margin: 0;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
  }
  ${MenuItem} {
    margin: 0;
    width: 100%;
    border-bottom: 1px solid ${selectedColor};
    &:first-child {
      border-top: 1px solid ${selectedColor};
    }
    a {
      border-left: 5px solid transparent;
      display: flex;
      align-items: center;
      width: 100%;
      color: white;
      font-size: 20px;
      padding: 15px 30px;
      &:hover,
      &.active {
        color: ${Theme.primary};
      }
    }
    a.active {
      color: white;
      border-left-color: ${Theme.primary};
      background: ${selectedColor};
    }
    a.active {
      &::after {
        display: none;
      }
    }
  }
`;
