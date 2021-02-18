import { S } from 'schema';
import { CheckPromoCodResult } from 'shared';
import { PromoCodeCollection } from '../../collections/PromoCode';
import { createContract, createRpcBinding } from '../../lib';

export const checkPromoCode = createContract('subscription.checkPromoCode')
  .params('code')
  .schema({
    code: S.string(),
  })
  .returns<CheckPromoCodResult>()
  .fn(async code => {
    const promo = await PromoCodeCollection.findById(code.toLowerCase());
    if (!promo) {
      return {
        type: 'invalid',
      };
    }
    return {
      type: 'valid',
      discount: promo.discount,
    };
  });

export const checkPromoCodeRpc = createRpcBinding({
  public: true,
  signature: 'subscription.checkPromoCode',
  handler: checkPromoCode,
});
