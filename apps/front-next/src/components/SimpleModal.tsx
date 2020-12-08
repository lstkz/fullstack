import React from 'react';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Modal, ModalProps } from 'src/components/Modal';
import { spacerStyle } from 'src/components/_spacer';
import styled from 'styled-components';

interface SimpleModalProps
  extends Pick<ModalProps, 'isOpen' | 'close' | 'bgColor' | 'testId'> {
  icon: React.ReactNode;
  header: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

const Content = styled.div`
  text-align: center;
  ${spacerStyle}
`;

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
      <Content py={4}>
        {icon}
        <Heading type={4} center white mt={4} mb={3}>
          {title}
        </Heading>
        {description}
      </Content>
    </Modal>
  );
}
