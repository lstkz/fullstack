import React from 'react';
import {
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlText,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
} from 'mjml-react';

export interface ButtonActionTemplateProps {
  unsubscribeLink?: string;
  header: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export function ButtonActionTemplate(props: ButtonActionTemplateProps) {
  const { unsubscribeLink, header, description, buttonText, buttonUrl } = props;
  return (
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name="Nunito Sans"
          href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,800&display=swap"
        />
        <MjmlTitle>Fullstack.pl</MjmlTitle>
        <MjmlPreview>{header}</MjmlPreview>
        <MjmlAttributes>
          <MjmlAll padding="0" fontFamily="Nunito Sans, sans-serif" />
        </MjmlAttributes>
      </MjmlHead>
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
        <MjmlSection backgroundColor="white" paddingTop={30} paddingBottom={30}>
          <MjmlColumn>
            <MjmlButton
              innerPadding="20px 28px"
              fontWeight={700}
              backgroundColor="#008aff"
              href={buttonUrl}
              borderRadius={6}
              fontSize={16}
            >
              {buttonText}
            </MjmlButton>
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
