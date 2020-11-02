import styled from 'styled-components';
import { Theme } from '../Theme';

export const Input = styled.input`
  display: block;
  padding: 10px 20px;
  background: rgba(237, 238, 244, 0.6);
  border: 1px solid rgba(51, 54, 69, 0.3);
  border-radius: 5px;
  color: #333645;
  font-size: 17px;
  line-height: 28px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${Theme.primary};
    background: rgba(247, 100, 108, 0.07);
  }
`;
