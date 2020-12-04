export interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
  isVerified: boolean;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface SubscriptionResult {
  result: 'ok' | 'already-subscribed';
}

export interface Course {
  id: string;
  name: string;
  description: string;
  promoPrice: number;
  price: number;
  promoEnds: string;
  hasAccess: boolean;
}

export interface VideoUpload {
  resolution: number;
  s3Key: string;
}

export interface CourseLessonUpload {
  id: number;
  name: string;
  week: number;
  sources: VideoUpload[];
}
export interface CourseTaskUpload {
  id: number;
  name: string;
  week: number;
  s3Key: string;
}
export interface TPayGroup {
  id: number;
  name: string;
  banks: string;
  img: string;
  main_bank_id: number;
}

export interface PriceDefinition {
  net: number;
  vat: number;
  vatRate: number;
  total: number;
}

export type SubscriptionPlanType = 'monthly' | 'annual';

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionPlanType;
  price: PriceDefinition;
  pricePerMonth: number;
  savings: number;
}
