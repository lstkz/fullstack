import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/new-components/Dashboard';
import { Heading } from 'src/new-components/Heading';
import { SpinnerBoarder } from 'src/new-components/SpinnerBoarder';
import styled from 'styled-components';
import { useCheckOrderModule } from '../module';

const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;

const Wrapper = styled.div`
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #eaecf3;
  border-radius: 0.375rem;
  margin-top: 4rem;
`;

export function CheckOrderView() {
  useCheckOrderModule();

  return (
    <Dashboard>
      <Container>
        <Wrapper>
          <Heading type={3} center mt={5}>
            Oczekiwanie na płatność
          </Heading>
          <Center>
            <SpinnerBoarder />
          </Center>
        </Wrapper>
      </Container>
    </Dashboard>
  );
}
