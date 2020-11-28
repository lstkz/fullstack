import styled from 'styled-components';
import { Theme } from 'src/Theme';

export const MenuItem = styled.div<{ red?: boolean }>`
  a {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: ${props => (props.red ? Theme.red : Theme.gray_700)};
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }
`;

export const MenuSeparator = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid ${Theme.gray_200};
`;

export const DropdownPopup = styled.div`
  font-size: 0.875rem;
  min-width: 12rem;
  padding: 0.35rem 0;
  margin: 0.125rem 0 0;
  font-size: 0.875rem;
  color: ${Theme.gray_600};
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.5rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
`;
