import { createBaseEntity } from '../lib';

export interface CourseActivationCodeKey {
  code: string;
}

export interface CourseActivationCodeProps extends CourseActivationCodeKey {
  courseId: string;
  orderId: string;
}

const BaseEntity = createBaseEntity('course_activation_code')
  .props<CourseActivationCodeProps>()
  .key<CourseActivationCodeKey>(key => `$:${key.code}`)
  .build();

export class CourseActivationCodeEntity extends BaseEntity {}
