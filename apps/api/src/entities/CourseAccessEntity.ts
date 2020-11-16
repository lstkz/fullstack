import { createBaseEntity } from '../lib';

export interface CourseAccessKey {
  userId: string;
  courseId: string;
}

export interface CourseAccessProps extends CourseAccessKey {}

const BaseEntity = createBaseEntity('course_access')
  .props<CourseAccessProps>()
  .key<CourseAccessKey>(key => ({
    pk: `$:${key.userId}`,
    sk: `$:${key.userId}:${key.courseId}`,
  }))
  .build();

export class CourseAccessEntity extends BaseEntity {
  static getAllUserAccess(userId: string) {
    return this.queryAll({
      key: {
        pk: this.createKey({ userId, courseId: '' }).pk,
      },
    });
  }
}
