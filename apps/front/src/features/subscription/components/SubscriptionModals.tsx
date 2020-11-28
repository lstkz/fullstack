import { faCheckCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SimpleModal } from 'src/components/SimpleModal';
import { useActions } from 'typeless';
import { getSubscriptionState, SubscriptionActions } from '../interface';

export function SubscriptionModals() {
  const { visibleModal } = getSubscriptionState.useState();
  const { hideModal } = useActions(SubscriptionActions);
  return (
    <>
      <SimpleModal
        isOpen={visibleModal === 'confirm'}
        bgColor="primary"
        header="Prawie gotowe!"
        icon={<FontAwesomeIcon size="4x" icon={faEnvelope} />}
        title="Potwierdź maila"
        description={
          <>
            Link potwierdzający został wysłany na Twój adres email.
            <br />
            Potwierdź go, aby otrzymywać newsletter.
          </>
        }
        close={hideModal}
      />
      <SimpleModal
        isOpen={visibleModal === 'already-subscribed'}
        bgColor="success"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        title="Już subskrypujesz"
        description={<>Już się zapisałes to naszego newslettera.</>}
        close={hideModal}
      />
      <SimpleModal
        isOpen={visibleModal === 'confirmed'}
        bgColor="primary"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        title="Potwierdzono"
        description={<>Twój e-mail został potwierdzony.</>}
        close={hideModal}
      />
      <SimpleModal
        isOpen={visibleModal === 'unsubscribed'}
        bgColor="warning"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faEnvelope} />}
        title="Email usunięty"
        description={<>Twój e-mail został usunięty z naszej bazy danych.</>}
        close={hideModal}
      />
    </>
  );
}
