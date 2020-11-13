import { S } from 'schema';
import { createContract, createEventBinding } from '../../lib';
import { getDuration, randomUniqString } from '../../common/helper';
import { APP_BASE_URL } from '../../config';
import { UserEntity } from '../../entities/UserEntity';
import { ConfirmCodeEntity } from '../../entities/ConfirmCodeEntity';
import { sendEmail } from '../../common/email';

export const sendConfirmEmail = createContract('notification.sendConfirmEmail')
  .params('userId')
  .schema({
    userId: S.string(),
  })
  .fn(async userId => {
    const code = randomUniqString();
    const user = await UserEntity.getByKey({ userId });
    const confirmCode = new ConfirmCodeEntity({
      userId: user.userId,
      code,
      expiresAt: Date.now() + getDuration(1, 'd'),
    });
    await confirmCode.insert();

    const confirmLink = `${APP_BASE_URL}/confirm/${code}`;
    await sendEmail({
      to: user.email,
      subject: '👋 Potwierdź swój email',
      body: `
        Cześć,
        <br/>
        <br/>
        Otwórz poniższy link, żeby potwierdzić konto:
        <br/>
        <a href="${confirmLink}">Potwierdź</a>
        <br/>
        <br/>
        Fullstack.pl`,
    });
  });

export const sendConfirmEmailEvent = createEventBinding({
  type: 'UserRegisteredEvent',
  handler(event) {
    return sendConfirmEmail(event.payload.userId);
  },
});
