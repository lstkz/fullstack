import { AppError } from '../../common/errors';
import { CourseActivationCodeEntity } from '../../entities/CourseActivationCodeEntity';
import { UsedCourseActivationCodeEntity } from '../../entities/UsedCourseActivationCodeEntity';

export async function _checkCodeUsed(code: string) {
  const [activationCode, usedActivationCode] = await Promise.all([
    CourseActivationCodeEntity.getByCodeOrNull(code),
    UsedCourseActivationCodeEntity.getByKeyOrNull({
      code,
    }),
  ]);
  if (!activationCode || usedActivationCode) {
    throw new AppError('invalid activation code');
  }
}
