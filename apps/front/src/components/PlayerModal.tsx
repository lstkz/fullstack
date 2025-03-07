import React from 'react';
import { Heading } from './Heading';
import { Modal } from './Modal';

interface PlayerModalProps {
  header: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  footer?: React.ReactNode;
}

export function PlayerModal(props: PlayerModalProps) {
  const { header, footer, children, isOpen, close } = props;
  return (
    <Modal
      testId="player-modal"
      bgColor="dark-600"
      header={
        <Heading type={4} white className="px-6">
          {header}
        </Heading>
      }
      size="full"
      isOpen={isOpen}
      close={close}
    >
      <div className="-m-6 mb-2 bg-black py-4">
        <div
          className="flex items-center justify-center "
          style={{ minHeight: '80vh' }}
        >
          {children}
        </div>
      </div>
      {footer}
    </Modal>
  );
}
