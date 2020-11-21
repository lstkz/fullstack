import { Icon } from 'src/new-components/Icon';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

export const IconList = styled.ul`
  padding-left: 0;
  list-style: none;
  align-items: center;
  li {
    padding: 0.5rem 0;
    font-weight: 600;
    color: ${NewTheme.headings_color};
    display: flex;
    align-items: center;
    ${Icon} {
      flex-shrink: 0;
      display: flex;
      margin-right: 1rem;
    }
  }
`;
