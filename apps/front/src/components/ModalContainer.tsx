import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'src/components/Portal';
import { FocusContainer } from './FocusContainer';
import styles from './ModalContainer.module.css';

interface ModalContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function ModalContainer(props: ModalContainerProps) {
  const { children, isOpen } = props;
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    if (document.body.style.overflow === 'hidden') {
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Portal>
      <>
        <CSSTransition
          in={isOpen}
          classNames={{
            enter: styles['modal-enter'],
            enterActive: styles['modal-enter-active'],
            exit: styles['modal-exit'],
            exitActive: styles['modal-exit-active'],
          }}
          timeout={150}
          unmountOnExit
          mountOnEnter
        >
          <FocusContainer data-focus-root>
            <div ref={modalRef} tabIndex={-1}></div>
            {children}
          </FocusContainer>
        </CSSTransition>
      </>
    </Portal>
  );
}
