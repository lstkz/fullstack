import { S } from 'schema';
import { Course } from 'shared';
import { AppError } from '../../common/errors';
import { CourseEntity } from '../../entities/CourseEntity';
import { createContract, createRpcBinding } from '../../lib';

export const getCourse = createContract('course.getCourse')
  .params('courseId')
  .schema({
    courseId: S.string(),
  })
  .returns<Course>()
  .fn(async courseId => {
    const course = await CourseEntity.getByKeyOrNull({ courseId });
    if (!course) {
      throw new AppError('Course not found');
    }
    return course.toCourse(false);
  });

export const getCourseRpc = createRpcBinding({
  public: true,
  signature: 'course.getCourse',
  handler: getCourse,
});
