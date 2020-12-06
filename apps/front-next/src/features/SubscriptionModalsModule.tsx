import React from 'react';
import { faCheckCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SimpleModal } from 'src/components/SimpleModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useImmer } from 'use-immer';

type SubscriptionModalType =
  | 'confirm'
  | 'confirmed'
  | 'already-subscribed'
  | 'unsubscribed';

interface Actions {
  show: (visibleModal: SubscriptionModalType) => void;
  hide: () => void;
}

interface State {
  visibleModal: SubscriptionModalType | null;
}

const SubscriptionModalsContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface SubscriptionModalsProps {
  children: React.ReactNode;
}

export function SubscriptionModalsModule(props: SubscriptionModalsProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>({ visibleModal: null });
  const { visibleModal } = state;

  const actions = React.useMemo<Actions>(
    () => ({
      hide: () =>
        setState(draft => {
          draft.visibleModal = null;
        }),

      show: visibleModal =>
        setState(draft => {
          draft.visibleModal = visibleModal;
        }),
    }),
    []
  );

  return (
    <SubscriptionModalsContext.Provider
      value={{
        state,
        actions,
      }}
    >
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
        close={actions.hide}
      />
      <SimpleModal
        isOpen={visibleModal === 'already-subscribed'}
        bgColor="success"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        title="Już subskrypujesz"
        description={<>Już się zapisałes to naszego newslettera.</>}
        close={actions.hide}
      />
      <SimpleModal
        isOpen={visibleModal === 'confirmed'}
        bgColor="primary"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faCheckCircle} />}
        title="Potwierdzono"
        description={<>Twój e-mail został potwierdzony.</>}
        close={actions.hide}
      />
      <SimpleModal
        isOpen={visibleModal === 'unsubscribed'}
        bgColor="warning"
        header="Newsletter"
        icon={<FontAwesomeIcon size="4x" icon={faEnvelope} />}
        title="Email usunięty"
        description={<>Twój e-mail został usunięty z naszej bazy danych.</>}
        close={actions.hide}
      />
      {children}
    </SubscriptionModalsContext.Provider>
  );
}

export function useSubscriptionModalsActions() {
  return React.useContext(SubscriptionModalsContext).actions;
}
