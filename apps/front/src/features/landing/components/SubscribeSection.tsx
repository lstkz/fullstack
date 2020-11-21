import * as React from 'react';
import { Container } from 'src/components/Container';
import { Button } from 'src/new-components/Button';
import { Heading } from 'src/new-components/Heading';
import { Input } from 'src/new-components/Input';
import { InputGroup } from 'src/new-components/InputGroup';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

const Desc = styled.div`
  color: ${NewTheme.text_muted_color};
`;

interface SubscribeSectionProps {
  className?: string;
}

const _SubscribeSection = (props: SubscribeSectionProps) => {
  const { className } = props;
  return (
    <div className={className} id="subscribe-section">
      <Container>
        <Heading type={2}>Dołącz do mailingu</Heading>
        <Desc>
          Platforma jest w budowie. Podaj swojego maila, a dostaniesz
          powiadomienie jak wystartujemy.
        </Desc>

        <InputGroup
          size="large"
          input={<Input placeholder="Twój email" />}
          append={<Button type="primary">Zapisz się</Button>}
        />
      </Container>
    </div>
  );
};

export const SubscribeSection = styled(_SubscribeSection)`
  display: block;
  background: ${NewTheme.section_secondary};
  padding: 4.5rem 0;
  text-align: center;
  ${InputGroup} {
    margin: 2rem auto;
    max-width: 600px;
  }
  ${MEDIA_MD} {
    padding: 4.5rem;
  }
`;
