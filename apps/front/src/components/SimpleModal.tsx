import React from 'react';
import { Modal, ModalProps } from 'src/components/Modal';
import { Button } from './Button';
import { Heading } from './Heading';

interface SimpleModalProps
  extends Pick<ModalProps, 'isOpen' | 'close' | 'bgColor' | 'testId'> {
  icon: React.ReactNode;
  header?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function SimpleModal(props: SimpleModalProps) {
  const { isOpen, close, icon, title, description, ...rest } = props;
  return (
    <Modal
      {...rest}
      isOpen={isOpen}
      close={close}
      footer={
        <Button
          testId="close-btn"
          size="small"
          type="secondary"
          onClick={() => close('close-button')}
        >
          Zamknij
        </Button>
      }
    >
      <div className="text-center py-6">
        {icon}
        <Heading type={4} className="text-center mt-4 mb-3" white>
          {title}
        </Heading>
        {description}
      </div>
    </Modal>
  );
}
