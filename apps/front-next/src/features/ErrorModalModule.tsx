import React from 'react';
import { SimpleModal } from 'src/components/SimpleModal';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useImmer } from 'use-immer';
import { getErrorMessage } from 'src/common/helper';

interface Actions {
  hide: () => void;
  show: (message: string) => void;
}

const ErrorModalContext = React.createContext<{
  state: {
    isOpen: boolean;
    message: string;
  };
  actions: Actions;
}>(null!);

export interface ErrorModalProps {
  children: React.ReactNode;
}

export function ErrorModalModule(props: ErrorModalProps) {
  const { children } = props;
  const [state, setState] = useImmer({ isOpen: false, message: '' });
  const { isOpen, message } = state;

  const actions = React.useMemo<Actions>(
    () => ({
      hide: () =>
        setState(draft => {
          draft.isOpen = false;
        }),

      show: message =>
        setState(draft => {
          draft.isOpen = true;
          draft.message =
            typeof message == 'string' ? message : getErrorMessage(message);
        }),
    }),
    []
  );

  const hideErrorModal = () =>
    setState(draft => {
      draft.isOpen = false;
    });

  return (
    <ErrorModalContext.Provider
      value={{
        state,
        actions,
      }}
    >
      <SimpleModal
        testId="error-modal"
        bgColor="danger"
        isOpen={isOpen}
        close={hideErrorModal}
        icon={<FontAwesomeIcon size="4x" icon={faExclamationCircle} />}
        header="Ooops..."
        title="Wystąpił błąd"
        description={<span data-test="error-msg">{message}</span>}
      />
      {children}
    </ErrorModalContext.Provider>
  );
}

function useContext() {
  const context = React.useContext(ErrorModalContext);
  if (!context) {
    throw new Error('ErrorModalContext is not set');
  }
  return context;
}

export function useErrorModalActions() {
  return useContext().actions;
}
