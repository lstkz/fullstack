import { createBaseEntity } from '../lib';

export interface CourseTaskKey {
  courseTaskId: number;
  courseId: string;
}

export interface CourseTaskProps extends CourseTaskKey {
  name: string;
  week: number;
  s3Key: string;
}

const BaseEntity = createBaseEntity('course_task')
  .props<CourseTaskProps>()
  .key<CourseTaskKey>(key => ({
    pk: `$:${key.courseId}`,
    sk: `$:${key.courseId}:${key.courseTaskId}`,
  }))
  .build();

export class CourseTaskEntity extends BaseEntity {}
