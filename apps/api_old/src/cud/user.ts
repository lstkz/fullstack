import { AppError } from '../common/errors';
import { createTransaction } from '../lib';
import { UserEntity, UserProps } from '../entities/UserEntity';
import { UserEmailEntity } from '../entities/UserEmailEntity';
import { GithubUserEntity } from '../entities/GithubUserEntity';

export async function createUserCUD(props: UserProps) {
  const userEmail = new UserEmailEntity({
    userId: props.userId,
    email: props.email,
  });
  const user = new UserEntity(props);

  await UserEmailEntity.getIsTaken(props.email).then(isTaken => {
    if (isTaken) {
      throw new AppError('Email is already registered');
    }
  });

  const t = createTransaction();
  t.insert(userEmail, {
    conditionExpression: 'attribute_not_exists(pk)',
  });
  t.insert(user);
  if (props.githubId) {
    t.insert(
      new GithubUserEntity({
        userId: props.userId,
        githubId: props.githubId,
      })
    );
  }
  await t.commit();
  return user;
}

export async function updateEmailCUD(user: UserEntity, newEmail: string) {
  const t = createTransaction();
  if (user.email.toLowerCase() !== newEmail.toLowerCase()) {
    await UserEmailEntity.getIsTaken(newEmail).then(isTaken => {
      if (isTaken) {
        throw new AppError('Email is already registered');
      }
    });
    const oldUserEmail = new UserEmailEntity({
      userId: user.userId,
      email: user.email,
    });
    const newUserEmail = new UserEmailEntity({
      userId: user.userId,
      email: newEmail,
    });
    t.delete(oldUserEmail, {
      conditionExpression: 'attribute_exists(pk)',
    });
    t.insert(newUserEmail, {
      conditionExpression: 'attribute_not_exists(pk)',
    });
  }
  user.email = newEmail;
  t.update(user, ['email']);
  await t.commit();
  return user;
}
