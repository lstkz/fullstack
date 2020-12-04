import { createBaseEntity } from '../lib';

export interface UsedCourseActivationCodeKey {
  code: string;
}

export interface UsedCourseActivationCodeProps
  extends UsedCourseActivationCodeKey {
  orderId: string;
  usedAt: number;
  usedByUserId: string;
}

const BaseEntity = createBaseEntity('used_course_activation_code')
  .props<UsedCourseActivationCodeProps>()
  .key<UsedCourseActivationCodeKey>(key => `$:${key.code}`)
  .build();

export class UsedCourseActivationCodeEntity extends BaseEntity {}
