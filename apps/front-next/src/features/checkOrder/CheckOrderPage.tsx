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
import { Button } from 'src/components/Button';
import { useRouter } from 'next/dist/client/router';
import { api } from 'src/services/api';
import { useErrorModalActions } from '../ErrorModalModule';

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

export function CheckOrderPage() {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [isDone, setIsDone] = React.useState(false);
  const errorModalActions = useErrorModalActions();

  React.useEffect(() => {
    let canceled = false;
    const check = async () => {
      try {
        const ret = await api.subscription_checkStatus(
          router.query.code as string
        );
        if (canceled) {
          return;
        }
        if (ret.status === 'PAID') {
          setIsDone(true);
        } else {
          setTimeout(check, 1000);
        }
      } catch (e) {
        errorModalActions.show(e);
      }
    };
    void check();
    return () => {
      canceled = true;
    };
  }, []);

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
