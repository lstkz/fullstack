import { execContract, setupDb } from '../helper';
import { getCustomerData, registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { updateGeneralInfo } from '../../src/contracts/user/updateGeneralInfo';
import { getGeneralInfo } from '../../src/contracts/user/getGeneralInfo';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
});

it('should update info successfully', async () => {
  const info = getCustomerData();
  await execContract(
    updateGeneralInfo,
    {
      info,
    },
    'user1_token'
  );
  const latest = await execContract(getGeneralInfo, {}, 'user1_token');
  expect(latest).toEqual(info);
});
