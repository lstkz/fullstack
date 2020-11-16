import { S } from 'schema';
import * as R from 'remeda';
import { Course } from 'shared';
import { CourseAccessEntity } from '../../entities/CourseAccessEntity';
import { CourseEntity } from '../../entities/CourseEntity';
import { createContract, createRpcBinding } from '../../lib';

async function _getCourseAccess(userId: string | undefined) {
  if (!userId) {
    return [];
  }
  return CourseAccessEntity.getAllUserAccess(userId);
}

export const getAllCourses = createContract('course.getAllCourses')
  .params('userId')
  .schema({
    userId: S.string().optional(),
  })
  .returns<Array<Course>>()
  .fn(async userId => {
    const [courses, courseAccess] = await Promise.all([
      CourseEntity.getAll(),
      _getCourseAccess(userId),
    ]);
    const map = R.indexBy(courseAccess, x => x.courseId);
    return courses
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => item.toCourse(!!map[item.courseId]));
  });

export const getAllCoursesRpc = createRpcBinding({
  public: true,
  injectUser: true,
  signature: 'course.getAllCourses',
  handler: getAllCourses,
});
