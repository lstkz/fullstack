import { config } from 'config';
import { S } from 'schema';
import { ConfirmEmailChangeCollection } from '../../collections/ConfirmEmailChange';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { randomUniqString } from '../../common/helper';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';

export const updateEmail = createContract('user.updateEmail')
  .params('user', 'newEmail')
  .schema({
    user: S.object().appUser(),
    newEmail: S.string().email(),
  })
  .returns<{
    ok: boolean;
  }>()
  .fn(async (user, newEmail) => {
    if (user.email.toLowerCase() === newEmail.toLowerCase()) {
      return {
        ok: false,
      };
    }
    const existing = await UserCollection.findOneByEmail(newEmail);
    if (existing) {
      throw new AppError('Email already used by another user');
    }
    const code = randomUniqString();
    await ConfirmEmailChangeCollection.insertOne({
      _id: code,
      newEmail,
      userId: user._id,
    });
    const confirmLink = `${config.appBaseUrl}?confirm-new-email=${code}`;
    await dispatchTask({
      type: 'SendEmail',
      payload: {
        to: newEmail,
        subject: 'Potwierdź zmianę adresu email',
        template: {
          name: 'ButtonAction',
          params: {
            buttonText: 'Potwierdź',
            buttonUrl: confirmLink,
            header: 'Nowy email.',
            description:
              'Kliknij w poniższy link, żeby potwierdzić swój nowy adres email.',
          },
        },
      },
    });
    return {
      ok: true,
    };
  });

export const updateEmailRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updateEmail',
  handler: updateEmail,
});
