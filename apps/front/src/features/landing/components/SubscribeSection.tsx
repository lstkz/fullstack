import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Container } from 'src/components/Container';
import { Link } from 'src/components/Link';
import { Button } from 'src/new-components/Button';
import { Heading } from 'src/new-components/Heading';
import { Input } from 'src/new-components/Input';
import { InputGroup } from 'src/new-components/InputGroup';
import { Modal } from 'src/new-components/Modal';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spacer } from 'src/new-components/_spacer';
import { SubscribeFormProvider } from '../subscribe-form';

const Desc = styled.div`
  color: ${NewTheme.text_muted_color};
`;

const Text = styled.div`
  color: ${NewTheme.text_muted_color};
  font-size: 0.8rem;
`;

interface SubscribeSectionProps {
  className?: string;
}

const _SubscribeSection = (props: SubscribeSectionProps) => {
  const { className } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <SubscribeFormProvider>
      <div className={className} id="subscribe-section">
        <Modal
          isOpen={isModalOpen}
          bgColor="primary"
          header="Prawie gotowe!"
          close={() => {
            setIsModalOpen(false);
          }}
        >
          <Spacer py={4}>
            <FontAwesomeIcon size="4x" icon={faEnvelope} />
            <Heading type={4} center white mt={4} mb={3}>
              Potwierdź maila
            </Heading>
            Link potwierdzający został wysłany na Twój adres email.
            <br />
            Potwierdź go, aby otrzymywać newsletter.
          </Spacer>
        </Modal>
        <Container>
          <Heading type={2}>Dołącz do mailingu</Heading>
          <Desc>
            Platforma jest w budowie. Podaj swojego maila, a dostaniesz
            powiadomienie jak wystartujemy.
          </Desc>

          <InputGroup
            size="large"
            input={<Input placeholder="Twój email" />}
            append={
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                type="primary"
              >
                Zapisz się
              </Button>
            }
          />
          <Text>
            Zapisując się to newslettera wyrażasz zgodę na przetwarzanie Twoich
            danych zgodnie z{' '}
            <Link href={createUrl({ name: 'privacy' })}>
              polityką prywatności
            </Link>
            .
          </Text>
        </Container>
      </div>
    </SubscribeFormProvider>
  );
};

export const SubscribeSection = styled(_SubscribeSection)`
  display: block;
  background: ${NewTheme.section_secondary};
  padding: 4.5rem 0;
  text-align: center;
  ${InputGroup} {
    margin: 2rem auto 0.75rem;
    max-width: 600px;
  }
  ${MEDIA_MD} {
    padding: 4.5rem;
  }
`;
