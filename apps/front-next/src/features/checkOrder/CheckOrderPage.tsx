import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useRouter } from 'next/dist/client/router';
import { api } from 'src/services/api';
import { useErrorModalActions } from '../ErrorModalModule';
import { HeadingNext } from 'src/components/HeadingNext';
import { ButtonNext } from 'src/components/ButtonNext';

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
          <HeadingNext className="text-center mt-12" type={3}>
            Oczekiwanie na płatność
          </HeadingNext>
          <div className="flex justify-center py-20">
            <SpinnerBoarder />
          </div>
        </>
      );
    }
    return (
      <>
        <Confetti width={width} height={height} recycle={false} />
        <HeadingNext className="text-center mt-12" type={3}>
          Płatność zakończona pomyślnie
        </HeadingNext>
        <div className="text-center p-8">
          Masz teraz dostęp do wszystkich zasobów platformy.
        </div>
        <div className="text-success text-center">
          <FontAwesomeIcon icon={faCheckCircle} size="6x" />
        </div>
        <div className="flex justify-center py-20">
          <ButtonNext type="primary" href="/modules">
            Zobacz dostępne moduły
          </ButtonNext>
        </div>
      </>
    );
  };

  return (
    <Dashboard>
      <div className="container shadow-sm bg-white border border-gray-200 rounded-md my-16">
        {renderContent()}
      </div>
    </Dashboard>
  );
}
