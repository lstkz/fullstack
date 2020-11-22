import styled from 'styled-components';

export const Divider = styled.hr`
  position: relative;
  width: 100%;
  border-width: 0px;
  margin: 1.5rem 0;
  &::before {
    content: '';
    display: block;
    width: 80%;
    position: relative;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background: radial-gradient(
      at center center,
      rgba(255, 255, 255, 0.2) 0px,
      rgba(31, 45, 61, 0) 75%
    );
  }
`;
