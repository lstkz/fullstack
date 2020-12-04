import { S } from 'schema';
import { ButtonActionTemplate, MultiLinksTemplate } from 'email-templates';
import { createContract, createTaskBinding } from '../../lib';
import { renderTemplate, sendSESEmail } from '../../common/email';
import { safeKeys } from '../../common/helper';

const templates: Record<string, (props: any) => JSX.Element> = {
  ButtonAction: ButtonActionTemplate,
  MultiLinks: MultiLinksTemplate,
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
  .returns<void>()
  .fn(async (to, subject, template) => {
    const html = await renderTemplate(
      templates[template.name],
      template.params
    );
    await sendSESEmail({
      to: to,
      subject: subject,
      body: html,
    });
  });

export const sendEmailTask = createTaskBinding({
  type: 'SendEmail',
  async handler(messageId, task) {
    await sendEmail(task.to, task.subject, task.template);
  },
});
