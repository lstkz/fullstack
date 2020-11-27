import { S } from 'schema';
import { CourseAccessEntity } from '../../entities/CourseAccessEntity';
import { CourseActivationCodeEntity } from '../../entities/CourseActivationCodeEntity';
import { UsedCourseActivationCodeEntity } from '../../entities/UsedCourseActivationCodeEntity';
import { createContract, createTransaction } from '../../lib';

export const activateCourse = createContract('activation.activateCourse')
  .params('userId', 'activationCode')
  .schema({
    userId: S.string(),
    activationCode: S.string(),
  })
  .fn(async (userId, activationCode) => {
    const courseActivationCode = await CourseActivationCodeEntity.getByCodeOrNull(
      activationCode
    );
    const t = createTransaction();
    const usedCourseActivationCode = new UsedCourseActivationCodeEntity({
      code: activationCode,
      orderId: courseActivationCode.orderId,
      usedAt: Date.now(),
      usedByUserId: userId,
    });
    t.insert(usedCourseActivationCode, {
      conditionExpression: 'attribute_not_exists(pk)',
    });
    const courseAccess = new CourseAccessEntity({
      courseId: courseActivationCode.courseId,
      userId,
    });
    t.insert(courseAccess);
    await t.commit();
  });
