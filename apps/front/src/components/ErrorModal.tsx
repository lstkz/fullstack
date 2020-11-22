import React from 'react';
import { getGlobalState, GlobalActions } from 'src/features/global/interface';
import { useActions } from 'typeless';
import { SimpleModal } from 'src/new-components/SimpleModal';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ErrorModal() {
  const { isOpen, message } = getGlobalState.useState().errorModal;
  const { hideErrorModal } = useActions(GlobalActions);
  return (
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
  );
}
