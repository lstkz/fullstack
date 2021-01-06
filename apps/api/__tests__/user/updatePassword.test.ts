import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { login } from '../../src/contracts/user/login';
import { updatePassword } from '../../src/contracts/user/updatePassword';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
});

it('should update password successfully', async () => {
  await execContract(
    updatePassword,
    {
      password: '123qweASD',
    },
    'user1_token'
  );
  const ret = await execContract(login, {
    values: {
      email: 'user1@example.com',
      password: '123qweASD',
    },
  });
  expect(ret.user.email).toEqual('user1@example.com');
});
