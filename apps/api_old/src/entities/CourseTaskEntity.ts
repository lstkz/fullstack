import { createBaseEntity } from '../lib';

export interface CourseTaskKey {
  courseTaskId: number;
  courseId: string;
}

export interface CourseTaskProps extends CourseTaskKey {
  name: string;
  week: number;
  detailsS3Key: string;
  sourceS3Key: string;
}

const BaseEntity = createBaseEntity('course_task')
  .props<CourseTaskProps>()
  .key<CourseTaskKey>(key => ({
    pk: `$:${key.courseId}`,
    sk: `$:${key.courseId}:${key.courseTaskId}`,
  }))
  .build();

export class CourseTaskEntity extends BaseEntity {
  static getByCourse(courseId: string) {
    return this.queryAll({
      key: {
        pk: `course_task:${courseId}`,
      },
      sort: 'asc',
    });
  }
}
