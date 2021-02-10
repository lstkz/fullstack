import { execContract, getId, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { confirmNewEmail } from '../../src/contracts/user/confirmNewEmail';
import { ConfirmEmailChangeCollection } from '../../src/collections/ConfirmEmailChange';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
});

it('should throw error if code not found', async () => {
  await expect(
    execContract(
      confirmNewEmail,
      {
        code: '123',
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid code');
});

it('should throw error if assigned for another user', async () => {
  await ConfirmEmailChangeCollection.insertOne({
    _id: '123',
    newEmail: 'example2@gmail.com',
    userId: getId(2),
  });
  await expect(
    execContract(
      confirmNewEmail,
      {
        code: '123',
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid code');
});

it('should throw error if email taken', async () => {
  await ConfirmEmailChangeCollection.insertOne({
    _id: '123',
    newEmail: 'user2@example.com',
    userId: getId(1),
  });
  await expect(
    execContract(
      confirmNewEmail,
      {
        code: '123',
      },
      'user1_token'
    )
  ).rejects.toThrow('Cannot change email. Email taken by another user');
});
