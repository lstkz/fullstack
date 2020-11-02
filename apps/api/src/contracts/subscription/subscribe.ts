import { S } from 'schema';
import { SubscriptionResult } from 'shared';
import { SubscriptionEntity } from '../../entities/SubscriptionEntity';
import { SubscriptionRequestEntity } from '../../entities/SubscriptionRequestEntity';
import { createContract, createRpcBinding } from '../../lib';
import { randomUniqString } from '../../common/helper';
import { BASE_URL } from '../../config';
import { sendEmail } from '../../common/email';

export const subscribe = createContract('subscription.subscribe')
  .params('name', 'email')
  .schema({
    name: S.string().max(50),
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
    const subscriptionRequest = new SubscriptionRequestEntity({
      id: subId,
      name,
      email,
    });
    const confirmLink = `${BASE_URL}/confirm/${subId}`;
    await sendEmail({
      to: email,
      subject: '👋 Potwierdź subskrypcję',
      body: `
      Cześć ${name},
      <br/>
      <br/>
      Otwórz poniższy link, żeby potwierdzić subskrypcję:
      <br/>
      <a href="${confirmLink}">Potwierdź</a>
      <br/>
      <br/>
      Fullstack.pl`,
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
