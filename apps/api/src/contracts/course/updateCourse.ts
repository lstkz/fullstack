import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';

export const updateCourse = createContract('course.updateCourse')
  .params('id', 'course', 'lessons')
  .schema({
    id: S.string(),
    course: S.object().keys({
      name: S.string(),
      description: S.string(),
      promoPrice: S.number(),
      price: S.number(),
      promoEnds: S.date(),
    }),
    lessons: S.array().items(
      S.object().keys({
        id: S.number(),
        name: S.string(),
        week: S.number(),
        sources: S.array().items(
          S.object().keys({
            resolution: S.number(),
            s3Key: S.string(),
          })
        ),
      })
    ),
    tasks: S.array().items(
      S.object().keys({
        id: S.number(),
        name: S.string(),
        week: S.number(),
        s3Key: S.string(),
      })
    ),
  })
  .fn(async (id, course, lessons) => {});

export const updateCourseRpc = createRpcBinding({
  injectUser: true,
  admin: true,
  signature: 'course.updateCourse',
  handler: updateCourse,
});
