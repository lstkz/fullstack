import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from './Button';
import { Heading } from './Heading';
import { Modal } from './Modal';

interface ConfirmModalProps {
  testId?: string;
  children: React.ReactNode;
  title: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  confirm: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { children, title, confirm, ...rest } = props;

  return (
    <Modal
      {...rest}
      bgColor="danger"
      footer={
        <div className="grid grid-cols-2 gap-4">
          <Button
            testId="no-btn"
            size="small"
            type="secondary"
            onClick={props.close}
          >
            Nie
          </Button>
          <Button
            testId="yes-btn"
            size="small"
            type="secondary"
            onClick={confirm}
          >
            Tak
          </Button>
        </div>
      }
    >
      <div className="text-center py-6">
        <FontAwesomeIcon size="4x" icon={faQuestionCircle} />
        <Heading type={4} className="text-center mt-4 mb-3" white>
          {title}
        </Heading>
        <div>{children}</div>
      </div>
    </Modal>
  );
}
