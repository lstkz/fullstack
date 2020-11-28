import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'src/new-components/Container';
import { Dashboard } from 'src/new-components/Dashboard';
import { Heading } from 'src/new-components/Heading';
import { SpinnerBoarder } from 'src/new-components/SpinnerBoarder';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { getCheckOrderState } from '../interface';
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
  margin: 4rem 0;
`;

const Text = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CheckWrapper = styled.div`
  text-align: center;
  color: ${NewTheme.green};
`;

export function CheckOrderView() {
  useCheckOrderModule();
  const { isDone } = getCheckOrderState.useState();

  const renderContent = () => {
    if (!isDone) {
      return (
        <>
          <Heading type={3} center mt={5}>
            Oczekiwanie na płatność
          </Heading>
          <Center>
            <SpinnerBoarder />
          </Center>
        </>
      );
    }
    return (
      <>
        <Heading type={3} center mt={5}>
          Płatność zakończona pomyślnie
        </Heading>
        <Text>Na podanego maila został wysłany link do aktywacji konta.</Text>
        <CheckWrapper>
          <FontAwesomeIcon icon={faCheckCircle} size="6x" />
        </CheckWrapper>
        <Center></Center>
      </>
    );
  };

  return (
    <Dashboard>
      <Container>
        <Wrapper>{renderContent()}</Wrapper>
      </Container>
    </Dashboard>
  );
}
