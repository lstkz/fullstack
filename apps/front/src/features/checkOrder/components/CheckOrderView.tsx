import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { Theme } from 'src/Theme';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import styled from 'styled-components';
import { getCheckOrderState } from '../interface';
import { useCheckOrderModule } from '../module';
import { Button } from 'src/components/Button';

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
  color: ${Theme.green};
`;

export function CheckOrderView() {
  useCheckOrderModule();
  const { isDone } = getCheckOrderState.useState();
  const { width, height } = useWindowSize();

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
        <Confetti width={width} height={height} recycle={false} />
        <Heading type={3} center mt={5}>
          Płatność zakończona pomyślnie
        </Heading>
        <Text>Masz teraz dostęp do wszystkich zasobów platformy.</Text>
        <CheckWrapper>
          <FontAwesomeIcon icon={faCheckCircle} size="6x" />
        </CheckWrapper>
        <Center>
          <Button type="primary" href="/modules">
            Zobacz dostępne moduły
          </Button>
        </Center>
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
