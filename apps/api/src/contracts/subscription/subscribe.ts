import { S } from 'schema';
import { SubscriptionResult } from 'shared';
import { SubscriptionEntity } from '../../entities/SubscriptionEntity';
import { SubscriptionRequestEntity } from '../../entities/SubscriptionRequestEntity';
import { createContract, createRpcBinding } from '../../lib';
import { randomUniqString } from '../../common/helper';
import { APP_BASE_URL } from '../../config';
import { sendEmail } from '../../common/email';
import { actionButtonTemplate } from '../../email-templates/actionButtonTemplate';

export const subscribe = createContract('subscription.subscribe')
  .params('name', 'email')
  .schema({
    name: S.string().max(50).optional().nullable(),
    email: S.string().email(),
  })
  .returns<SubscriptionResult>()
  .fn(async (name, email) => {
    const existing = await SubscriptionEntity.getByKeyOrNull({
      email: email,
    });
    if (existing) {
      return {
        result: 'already-subscribed',
      };
    }
    const subId = randomUniqString();
    const unsubscribeCode = randomUniqString();
    const subscriptionRequest = new SubscriptionRequestEntity({
      id: subId,
      name,
      email,
      unsubscribeCode,
    });
    const confirmLink = `${APP_BASE_URL}?confirm-email=${subId}`;
    const unsubscribeLink = `${APP_BASE_URL}?unsubscribe=${unsubscribeCode}&source=request&email=${encodeURIComponent(
      email
    )}`;
    await sendEmail({
      to: email,
      subject: '👋 Potwierdź subskrypcję',
      body: actionButtonTemplate({
        buttonText: 'Potwierdź',
        buttonUrl: confirmLink,
        header: 'Już prawie gotowe.',
        description:
          'Jeszcze jeden ostatni krok – prosimy o potwierdzenie Twojego maila.',
        unsubscribeLink: unsubscribeLink,
      }),
    });

    await subscriptionRequest.insert();

    return {
      result: 'ok',
    };
  });

export const subscribeRpc = createRpcBinding({
  public: true,
  signature: 'subscription.subscribe',
  handler: subscribe,
});
