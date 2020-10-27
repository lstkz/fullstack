import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../Theme';

interface MainMenuProps {
  className?: string;
}

export const MenuItem = styled.li`
  font-weight: 500;
  font-size: 19px;
  a {
    color: ${Theme.textDark};
    &:hover,
    &.active {
      color: ${Theme.primary};
    }
    text-decoration: none;
  }
  & + & {
    margin-left: 60px;
  }
  a.active {
    &::after {
      content: ' ';
      display: block;
      width: 18px;
      height: 3px;
      border-radius: 20px;
      background: ${Theme.primary};
    }
  }
`;

const _MainMenu = (props: MainMenuProps) => {
  const { className } = props;
  return (
    <ul className={className}>
      <MenuItem>
        <Link to="/" activeClassName="active">
          Start
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/o-mnie" activeClassName="active">
          O mnie
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/kontakt" activeClassName="active">
          Kontakt
        </Link>
      </MenuItem>
    </ul>
  );
};

export const MainMenu = styled(_MainMenu)`
  list-style: none;
  margin-left: 115px;
  display: flex;
  align-items: center;
`;
