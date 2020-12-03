import * as R from 'remeda';
import { Course } from 'shared';
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

export class CourseEntity extends BaseEntity {
  static getAll() {
    return this.queryAll({
      key: {
        pk: 'course',
      },
    });
  }

  toCourse(hasAccess: boolean): Course {
    return {
      id: this.courseId,
      ...R.pick(this, ['name', 'description', 'promoPrice', 'price']),
      promoEnds: new Date(this.promoEnds).toISOString(),
      hasAccess,
    };
  }
}
