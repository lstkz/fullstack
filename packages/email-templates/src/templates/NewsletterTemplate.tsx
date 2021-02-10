import React from 'react';
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlRaw,
} from 'mjml-react';
import { EmailHead } from './shared/EmailHead';
import { EmailFooter } from './shared/EmailFooter';

export interface NewsletterTemplateProps {}

export function NewsletterTemplate(props: NewsletterTemplateProps) {
  return (
    <Mjml>
      <EmailHead />
      <MjmlBody backgroundColor="#171347">
        <MjmlSection backgroundColor="#171347" padding="30px 10px">
          <MjmlColumn>
            <MjmlText fontWeight={700} color="#fff" fontSize={30}>
              Fullstack
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection
          backgroundColor="white"
          paddingTop={10}
          paddingBottom={10}
          paddingLeft={30}
          paddingRight={30}
        >
          <MjmlRaw>
            <div style={{ fontSize: 16 }}>{'{{ message_content }}'}</div>
          </MjmlRaw>
        </MjmlSection>
        <EmailFooter unsubscribeLink="{{ unsubscribe_url }}" />
        <MjmlSection paddingTop={30}> </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}
