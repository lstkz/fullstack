import styled from 'styled-components';
import { CONTAINER_PADDING, MAX_SIZE } from '../const';

export const Container = styled.div`
  max-width: ${MAX_SIZE}px;
  margin: 0 auto;
  padding: 0 ${CONTAINER_PADDING}px;
`;
