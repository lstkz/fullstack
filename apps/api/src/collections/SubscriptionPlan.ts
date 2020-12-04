import { createCollection } from '../db';

export interface SubscriptionPlanModel {
  name: string;
  type: 'monthly' | 'annual';
  totalPrice: number;
  pricePerMonth: number;
  savings: number;
}

export const SubscriptionPlanCollection = createCollection<SubscriptionPlanModel>(
  'subscriptionPlan'
);
