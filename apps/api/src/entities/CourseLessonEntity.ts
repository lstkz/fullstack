import { VideoUpload } from 'shared';
import { createBaseEntity } from '../lib';

export interface CourseLessonKey {
  courseLessonId: number;
  courseId: string;
}

export interface CourseLessonProps extends CourseLessonKey {
  name: string;
  week: number;
  source: VideoUpload[];
}

const BaseEntity = createBaseEntity('course_lesson')
  .props<CourseLessonProps>()
  .key<CourseLessonKey>(key => ({
    pk: `$:${key.courseId}`,
    sk: `$:${key.courseId}:${key.courseLessonId}`,
  }))
  .build();

export class CourseLessonEntity extends BaseEntity {}
