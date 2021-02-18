import { createCollection } from '../db';

export interface PromoCodeModel {
  _id: string;
  discount: number;
}

export const PromoCodeCollection = createCollection<PromoCodeModel>(
  'promoCode'
);
