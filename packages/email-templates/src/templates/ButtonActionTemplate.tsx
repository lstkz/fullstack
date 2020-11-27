import React from 'react';
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlText,
} from 'mjml-react';
import { EmailHead } from './shared/EmailHead';
import { EmailFooter } from './shared/EmailFooter';

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
        <EmailFooter unsubscribeLink={unsubscribeLink} />
      </MjmlBody>
    </Mjml>
  );
}
