import * as R from 'remeda';
import React, { useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/dist/client/router';
import { useErrorModalActions } from './ErrorModalModule';
import { api } from '../services/api';
import { SimpleModal } from 'src/components/SimpleModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ConfirmEmailChecker() {
  const router = useRouter();
  const errorModalActions = useErrorModalActions();
  const [visibleModal, setVisibleModal] = useState<
    null | 'confirmed' | 'confirmed-new'
  >(null);
  React.useEffect(() => {
    const getQuery = (name: string) =>
      Array.isArray(router.query[name]) ? null : (router.query[name] as string);
    const confirmEmail = getQuery('confirm-email');
    const confirmNewEmail = getQuery('confirm-new-email');
    if (confirmEmail) {
      void router.replace({
        pathname: router.pathname,
        query: R.omit(router.query, ['confirm-email']),
      });
      api
        .user_confirmEmail(confirmEmail)
        .then(() => setVisibleModal('confirmed'))
        .catch(errorModalActions.show);
    }
    if (confirmNewEmail) {
      void router.replace({
        pathname: router.pathname,
        query: R.omit(router.query, ['confirm-new-email']),
      });
      api
        .user_confirmNewEmail(confirmNewEmail)
        .then(() => setVisibleModal('confirmed-new'))
        .catch(errorModalActions.show);
    }
  }, [router.query]);

  const closeModal = () => {
    setVisibleModal(null);
  };

  return (
    <>
      <SimpleModal
        testId="email-confirmed-modal"
        isOpen={visibleModal === 'confirmed'}
        bgColor="primary"
        title="Potwierdzono!"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        header="Potwierdź konto"
        description={<>Twój e-mail został potwierdzony.</>}
        close={closeModal}
      />
      <SimpleModal
        testId="email-confirmed-modal"
        isOpen={visibleModal === 'confirmed-new'}
        bgColor="primary"
        title="Potwierdzono!"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        header="Zmiena adresu email"
        description={<>Twój nowy e-mail został potwierdzony.</>}
        close={closeModal}
      />
    </>
  );
}
