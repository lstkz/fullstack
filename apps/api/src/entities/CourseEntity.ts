import { createBaseEntity } from '../lib';

export interface CourseKey {
  courseId: string;
}

export interface CourseProps extends CourseKey {
  name: string;
  description: string;
  price: number;
  promoPrice: number;
  promoEnds: number;
}

const BaseEntity = createBaseEntity('course')
  .props<CourseProps>()
  .key<CourseKey>(key => ({
    pk: `$`,
    sk: `$:${key.courseId}`,
  }))
  .build();

export class CourseEntity extends BaseEntity {}
