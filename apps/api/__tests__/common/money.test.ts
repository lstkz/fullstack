import { PriceInfo } from 'shared';
import { getDiscountedPrice, roundCurrency } from '../../src/common/money';

describe('roundCurrency', () => {
  test.each([
    [10.1, 10.1],
    [10.105, 10.11],
    [10.103, 10.1],
  ])('roundCurrency(%p)', (amount, result) => {
    expect(roundCurrency(amount)).toEqual(result);
  });
});

describe('getDiscountedPrice', () => {
  let price: PriceInfo = null!;
  beforeEach(() => {
    price = {
      net: 1000,
      total: 1230,
      vat: 230,
      vatRate: 23,
    };
  });

  it('discount 0', () => {
    const ret = getDiscountedPrice(price, 0);
    expect(ret).toEqual({
      net: 1000,
      total: 1230,
      vat: 230,
      vatRate: 23,
    });
  });

  it('discount 10', () => {
    const ret = getDiscountedPrice(price, 10);
    expect(ret).toEqual({
      net: 900,
      total: 1107,
      vat: 207,
      vatRate: 23,
    });
  });

  it('discount 50 from 199 (rounding issue)', () => {
    const ret = getDiscountedPrice(
      {
        net: 161.79,
        total: 199,
        vat: 37.21,
        vatRate: 23,
      },
      50
    );
    expect(ret).toEqual({
      net: 80.89,
      total: 99.5,
      vat: 18.61,
      vatRate: 23,
    });
  });
});
