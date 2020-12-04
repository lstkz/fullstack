import { S } from 'schema';
import { SubscriptionResult } from 'shared';
import { createContract, createRpcBinding } from '../../lib';
import { randomUniqString } from '../../common/helper';
import { config } from 'config';
import { SubscriptionCollection } from '../../collections/Subscription';
import {
  SubscriptionRequestCollection,
  SubscriptionRequestModel,
} from '../../collections/SubscriptionRequest';
import { dispatchTask } from '../../dispatch';

export const subscribe = createContract('subscription.subscribe')
  .params('name', 'email')
  .schema({
    name: S.string().max(50).optional().nullable(),
    email: S.string().email(),
  })
  .returns<SubscriptionResult>()
  .fn(async (name, email) => {
    const existing = await SubscriptionCollection.findOneByEmail(email);
    if (existing) {
      return {
        result: 'already-subscribed',
      };
    }
    const subId = randomUniqString();
    const unsubscribeCode = randomUniqString();
    const subscriptionRequest: SubscriptionRequestModel = {
      _id: subId,
      email,
      unsubscribeCode,
    };
    const confirmLink = `${config.appBaseUrl}?confirm-email=${subId}`;
    const unsubscribeLink = `${
      config.appBaseUrl
    }?unsubscribe=${unsubscribeCode}&source=request&email=${encodeURIComponent(
      email
    )}`;

    await SubscriptionRequestCollection.insertOne(subscriptionRequest);
    await dispatchTask({
      type: 'SendEmail',
      payload: {
        to: email,
        subject: '👋 Potwierdź subskrypcję',
        template: {
          name: 'ButtonAction',
          params: {
            buttonText: 'Potwierdź',
            buttonUrl: confirmLink,
            header: 'Już prawie gotowe.',
            description:
              'Jeszcze jeden ostatni krok – prosimy o potwierdzenie Twojego maila.',
            unsubscribeLink: unsubscribeLink,
          },
        },
      },
    });

    return {
      result: 'ok',
    };
  });

export const subscribeRpc = createRpcBinding({
  public: true,
  signature: 'subscription.subscribe',
  handler: subscribe,
});
