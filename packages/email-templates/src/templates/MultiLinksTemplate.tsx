import React from 'react';
import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText } from 'mjml-react';
import { EmailHead } from './shared/EmailHead';

export interface MultiLinksTemplateProps {
  unsubscribeLink?: string;
  header: string;
  description: string;
  links: string[];
}

export function MultiLinksTemplate(props: MultiLinksTemplateProps) {
  const { unsubscribeLink, header, description, links } = props;
  return (
    <Mjml>
      <EmailHead preview={header} />
      <MjmlBody width={600} backgroundColor="#171347">
        <MjmlSection backgroundColor="#171347" padding="30px 10px">
          <MjmlColumn>
            <MjmlText fontWeight={700} color="#fff" fontSize={30}>
              Fullstack
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="white" paddingTop={45} paddingBottom={15}>
          <MjmlColumn>
            <MjmlText align="center" color="#000" fontSize={30}>
              {header}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="white" paddingTop={10} paddingBottom={10}>
          <MjmlColumn>
            <MjmlText align="center" color="#718096" fontSize={14}>
              {description}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="white" paddingTop={10} paddingBottom={30}>
          <MjmlColumn width={300}>
            {links.map((link, i) => (
              <MjmlText
                key={i}
                padding="5px"
                align="center"
                color="#008aff"
                fontSize={14}
              >
                <a
                  href={link}
                  target="_blank"
                  style={{
                    color: '#008aff',
                  }}
                >
                  {link}
                </a>
              </MjmlText>
            ))}
          </MjmlColumn>
        </MjmlSection>
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
              topkoder - Łukasz Sentkiewicz ul. Strzelców 50/30 Gdynia 81-586
              NIP: 5862243134.
              <br />
              Copyright © 2020, wszelkie prawa zastrzeżone.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}
