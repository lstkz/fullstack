import { PriceInfo } from 'shared';

export function roundCurrency(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function getDiscountedPrice(price: PriceInfo, discount: number) {
  const newPrice: PriceInfo = {
    net: 0,
    total: roundCurrency((price.total * (100 - discount)) / 100),
    vat: 0,
    vatRate: price.vatRate,
  };
  newPrice.net = roundCurrency(newPrice.total / (1 + price.vatRate / 100));
  newPrice.vat = newPrice.total - newPrice.net;

  return newPrice;
}
