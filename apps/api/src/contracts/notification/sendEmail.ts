import { S } from 'schema';
import { ButtonActionTemplate } from 'email-templates';
import { createContract, createEventBinding } from '../../lib';
import { renderTemplate, sendSESEmail } from '../../common/email';
import { safeKeys } from '../../common/helper';

const templates = {
  ButtonAction: ButtonActionTemplate,
};

export const sendEmail = createContract('notification.sendConfirmEmail')
  .params('to', 'subject', 'template')
  .schema({
    to: S.string(),
    subject: S.string(),
    template: S.object().keys({
      name: S.enum().literal(...safeKeys(templates)),
      params: S.object().unknown(),
    }),
  })
  .fn(async (to, subject, template) => {
    const html = await renderTemplate(
      templates[template.name],
      template.params as any
    );

    await sendSESEmail({
      to: to,
      subject: subject,
      body: html,
    });
  });

export const sendEmailEvent = createEventBinding({
  type: 'SendEmailEvent',
  handler(event) {
    return sendEmail(
      event.payload.to,
      event.payload.subject,
      event.payload.template
    );
  },
});
