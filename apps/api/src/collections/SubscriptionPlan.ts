import { createCollection } from '../db';

export interface SubscriptionPlanModel {
  _id: string;
  name: string;
  type: 'monthly' | 'annual';
  price: {
    net: number;
    vat: number;
    vatRate: number;
    total: number;
  };
  pricePerMonth: number;
  savings: number;
}

export const SubscriptionPlanCollection = createCollection<SubscriptionPlanModel>(
  'subscriptionPlan'
);
