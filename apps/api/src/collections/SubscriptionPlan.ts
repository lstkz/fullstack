import { PriceDefinition, SubscriptionPlanType } from 'shared';
import { createCollection } from '../db';

export interface SubscriptionPlanModel {
  _id: string;
  name: string;
  type: SubscriptionPlanType;
  price: PriceDefinition;
  pricePerMonth: number;
  savings: number;
}

export const SubscriptionPlanCollection = createCollection<SubscriptionPlanModel>(
  'subscriptionPlan'
);
