import React from 'react';
import { render } from 'mjml-react';
import { ses } from '../lib';
import { config } from 'config';

interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendSESEmail(options: SendEmailOptions) {
  const { body, subject, to } = options;
  await ses
    .sendEmail({
      Source: config.emailSender,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: body.trim(),
          },
        },
      },
    })
    .promise();
}

export function renderTemplate<T>(
  component: (props: T) => JSX.Element,
  props: T
) {
  const { html, errors } = render(React.createElement(component, props), {
    minify: false,
  });
  if (errors.length) {
    console.error('Failed to compile template', errors);
    throw new Error('Failed to compile MJML template');
  }
  return html;
}
