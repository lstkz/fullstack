import { mocked } from 'ts-jest/utils';
import { getZoneRecord, removeZoneRecord } from '../../src/common/aws-helper';
import { removeVMDomainTask } from '../../src/contracts/vm/removeVMDomainTask';
import { setupDb } from '../helper';

jest.mock('../../src/common/aws-helper');

const mocked_getZoneRecord = mocked(getZoneRecord);
const mocked_removeZoneRecord = mocked(removeZoneRecord);

setupDb();

beforeEach(async () => {
  mocked_getZoneRecord.mockReset();
  mocked_removeZoneRecord.mockReset();
});

it('should ignore if does not exist', async () => {
  await removeVMDomainTask.options.handler('123', {
    domain: 'abc.example.org',
  });
  expect(mocked_removeZoneRecord).not.toBeCalled();
});

it('should remove domain', async () => {
  mocked_getZoneRecord.mockImplementation(async () => ({
    Name: 'abc.example.org',
    Type: 'A',
  }));
  await removeVMDomainTask.options.handler('123', {
    domain: 'abc.example.org',
  });
  expect(mocked_removeZoneRecord).toBeCalled();
});
