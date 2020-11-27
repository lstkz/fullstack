import React from 'react';
import { MjmlSection, MjmlColumn, MjmlText } from 'mjml-react';

interface EmailFooterProps {
  unsubscribeLink?: string;
}

export function EmailFooter(props: EmailFooterProps) {
  const { unsubscribeLink } = props;
  return (
    <MjmlSection backgroundColor="#2b303a" padding="15px 40px 10px">
      <MjmlColumn>
        {unsubscribeLink && (
          <MjmlText color="#a0aec0" fontSize={14} paddingBottom={20}>
            Otrzymujesz tę wiadomość, ponieważ zapisałeś się do newslettera.
            Jeśli nie chcesz już otrzymywać ode mnie żadnych maili kliknij{' '}
            <a
              href={unsubscribeLink}
              target="_blank"
              style={{
                color: '#a0aec0',
              }}
            >
              tutaj.
            </a>
          </MjmlText>
        )}
        <MjmlText align="center" color="#718096" fontSize={12}>
          topkoder - Łukasz Sentkiewicz ul. Strzelców 50/30 Gdynia 81-586 NIP:
          5862243134.
          <br />
          Copyright © 2020, wszelkie prawa zastrzeżone.
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
