import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { VoidLink } from './VoidLink';
import { FocusContainer } from './FocusContainer';
import { modalGlobalContext } from './ModalGlobalContext';
import { Portal } from 'src/components/Portal';
import styles from './Modal.module.css';
import classNames from 'classnames';

interface ModalContentProps {
  bgColor?: 'primary' | 'success' | 'danger' | 'warning';
}

export interface ModalProps extends ModalContentProps {
  transparent?: boolean;
  isOpen: boolean;
  close: (source: 'close-button' | 'background' | 'esc') => void;
  children: React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
  maxHeight?: string;
  noBackgroundClose?: boolean;
  testId?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal(props: ModalProps) {
  const {
    isOpen,
    close,
    children,
    transparent,
    size,
    maxHeight,
    noBackgroundClose,
    testId,
    header,
    footer,
    bgColor,
    ...contentProps
  } = props;

  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return () => {
        //
      };
    }

    const onKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        close('esc');
      }
    };
    modalGlobalContext.addListener(onKeyPress);
    return () => {
      modalGlobalContext.removeListener(onKeyPress);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const borderClass = bgColor ? 'border-alpha-white07' : 'border-gray-200';

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
            <div
              className="fixed top-0 left-0 w-full h-full opacity-40 bg-black"
              style={{ zIndex: 1001 }}
            />
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ zIndex: 1001 }}
              data-modal-wrapper
              onClick={e => {
                const target = e.target as HTMLDivElement;
                if (
                  target.hasAttribute('data-modal-wrapper') &&
                  !noBackgroundClose
                ) {
                  close('background');
                }
              }}
            >
              <div ref={modalRef}></div>
              <div
                className={classNames(
                  'relative flex flex-col w-full bg-white rounded-xl outline-none md:max-w-xl mx-auto my-7 shadow-lg md:shadow-2xl',
                  bgColor && `text-white bg-${bgColor}`
                )}
                {...contentProps}
                data-test={testId}
                ref={modalRef as any}
                tabIndex={-1}
                role="modal"
              >
                {header && (
                  <div
                    className={classNames(
                      'relative flex items-start justify-between p-5 border-b rounded-t-xl',
                      borderClass
                    )}
                  >
                    {header}
                    <VoidLink
                      className="p-5 leading-none font-semibold -m-4 ml-auto opacity-75 text-xl border border-dotted border-transparent focus:border-gray-200 hover:opacity-100 cursor-pointer text-alpha-white60 outline-none"
                      data-test="close-btn"
                      onClick={() => close('close-button')}
                      aria-label="close"
                    >
                      ×
                    </VoidLink>
                  </div>
                )}
                <div className="relative flex-auto p-6">{children}</div>
                <div
                  className={classNames(
                    'flex flex-wrap items-center justify-end rounded-b-xl p-5',
                    borderClass
                  )}
                >
                  {footer}
                </div>
              </div>
            </div>
          </FocusContainer>
        </CSSTransition>
      </>
    </Portal>
  );
}
