import { PromoCodeCollection } from '../../src/collections/PromoCode';
import { checkPromoCode } from '../../src/contracts/subscription/checkPromoCode';
import { execContract, setupDb } from '../helper';

setupDb();

beforeEach(async () => {
  await PromoCodeCollection.insertOne({ _id: 'code123', discount: 20 });
});

it('should should return invalid result', async () => {
  const ret = await execContract(checkPromoCode, {
    code: 'abc',
  });
  expect(ret).toEqual({
    type: 'invalid',
  });
});

it('should should return valid result', async () => {
  const ret = await execContract(checkPromoCode, {
    code: 'code123',
  });
  expect(ret).toEqual({
    type: 'valid',
    discount: 20,
  });
});

it('should should return valid result (case insensitive)', async () => {
  const ret = await execContract(checkPromoCode, {
    code: 'CODE123',
  });
  expect(ret).toEqual({
    type: 'valid',
    discount: 20,
  });
});
