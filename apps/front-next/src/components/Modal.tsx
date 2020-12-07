import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { VoidLink } from './VoidLink';
import { FocusContainer } from './FocusContainer';
import { modalGlobalContext } from './ModalGlobalContext';
import { MEDIA_MD, Theme } from 'src/Theme';
import { Portal } from 'src/components/Portal';

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

const Alpha = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1f2d3d;
  z-index: 1001;
  opacity: 0.4;
`;

const GlobalStyle = createGlobalStyle`
.modal-enter  {
  opacity: 0.01; 
}

.modal-enter.modal-enter-active {
  opacity: 1;
  transition: opacity 150ms ease-in-out;
}

.modal-exit {
  opacity: 1;
}

.modal-exit.modal-exit-active {
  opacity: 0.01;  
    transition: opacity 150ms ease-in-out;
}

.modal-open {
  overflow: hidden
}

`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid ${Theme.gray_200};
  border-top-left-radius: calc(0.75rem - 1px);
  border-top-right-radius: calc(0.75rem - 1px);
`;

const ModalFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 1.25rem;
  border-top: 1px solid ${Theme.gray_200};
  border-bottom-right-radius: calc(0.75rem - 1px);
  border-bottom-left-radius: calc(0.75rem - 1px);
  > * {
    margin: 0.25rem;
  }
`;

const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(31, 45, 61, 0.3);
  outline: 0;

  ${MEDIA_MD} {
    max-width: 500px;
    box-shadow: 0 0.5rem 1rem rgba(31, 45, 61, 0.3);
    margin: 1.75rem auto;
  }
  ${props =>
    props.bgColor &&
    css`
      color: white;
      background: ${Theme[props.bgColor]};
      ${ModalHeader},
      ${ModalFooter} {
        border-color: rgba(255, 255, 255, 0.075);
      }
    `}
`;

const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1.5rem;
`;

const Close = styled(VoidLink)`
  padding: 1.25rem;
  margin: -1rem -1rem -1rem auto;
  font-weight: 600;
  line-height: 1;
  color: rgba(255, 255, 255, 0.6);
  text-shadow: none;
  opacity: 0.75;
  font-size: 1.25rem;
  outline: none;
  border: 1px dotted transparent;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &:focus {
    border-color: ${Theme.gray_200};
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: black; */
  z-index: 1001;
`;

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
    ...contentProps
  } = props;

  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return () => {
        //
      };
    }

    const alreadyOpen = document.body.classList.contains('modal-open');
    if (!alreadyOpen) {
      document.body.classList.add('modal-open');
    }
    const onKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        close('esc');
      }
    };
    modalGlobalContext.addListener(onKeyPress);
    return () => {
      if (!alreadyOpen) {
        document.body.classList.remove('modal-open');
      }
      modalGlobalContext.removeListener(onKeyPress);
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
        <GlobalStyle />
        <CSSTransition
          in={isOpen}
          classNames="modal"
          timeout={150}
          unmountOnExit
          mountOnEnter
        >
          <FocusContainer data-focus-root>
            <Alpha />
            <Wrapper
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
              <ModalContent
                {...contentProps}
                data-testid={testId}
                ref={modalRef as any}
                tabIndex={-1}
                role="modal"
              >
                {header && (
                  <ModalHeader>
                    {header}
                    <Close
                      data-test="close-btn"
                      onClick={() => close('close-button')}
                      aria-label="close"
                    >
                      ×
                    </Close>
                  </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
                <ModalFooter>{footer}</ModalFooter>
              </ModalContent>
            </Wrapper>
          </FocusContainer>
        </CSSTransition>
      </>
    </Portal>
  );
}
