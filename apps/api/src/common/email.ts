import { EMAIL_SENDER } from '../config';
import { ses } from '../lib';

interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(options: SendEmailOptions) {
  const { body, subject, to } = options;
  await ses
    .sendEmail({
      Source: EMAIL_SENDER,
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
