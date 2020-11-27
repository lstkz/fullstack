import { md5 } from '../src/common/helper';
import { TPAY_CODE, TPAY_CUSTOMER_ID } from '../src/config';
import { createToken } from '../src/contracts/user/createToken';
import { _createUser } from '../src/contracts/user/_createUser';

export async function registerSampleUsers(isVerified = true) {
  await Promise.all([
    _createUser({
      userId: '1',
      email: 'user1@example.com',
      password: 'password1',
      isVerified: isVerified,
    }).then(() => createToken('1', 'user1_token')),
    _createUser({
      userId: '2',
      email: 'user2@example.com',
      password: 'password2',
      isVerified: isVerified,
    }).then(() => createToken('2', 'user2_token')),
  ]);
}

export function getCustomerData() {
  return {
    email: 'user1@example.org',
    firstName: 'John',
    lastName: 'Doe',
    address: 'address',
    postalCode: 'postalCode',
    city: 'city',
  };
}

export function getTPayHookData(crc = 'order-abc') {
  const amount = Number(120).toFixed(2);
  const tr_id = 't-123';
  return {
    id: TPAY_CUSTOMER_ID.toFixed(),
    tr_id: tr_id,
    tr_date: 'date',
    tr_crc: crc,
    tr_amount: amount,
    tr_paid: amount,
    tr_desc: 'foo',
    tr_status: 'TRUE' as const,
    tr_error: 'none',
    tr_email: 'john@',
    test_mode: '0',
    md5sum: md5(`${TPAY_CUSTOMER_ID}${tr_id}${amount}${crc}${TPAY_CODE}`),
  };
}
