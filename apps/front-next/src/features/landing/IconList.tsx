import { Icon } from 'src/components/Icon';
import { Theme } from 'src/Theme';
import styled from 'styled-components';

export const IconList = styled.ul`
  padding-left: 0;
  list-style: none;
  align-items: center;
  li {
    padding: 0.5rem 0;
    font-weight: 600;
    color: ${Theme.headings_color};
    display: flex;
    align-items: center;
    ${Icon} {
      flex-shrink: 0;
      display: flex;
      margin-right: 1rem;
    }
  }
`;
