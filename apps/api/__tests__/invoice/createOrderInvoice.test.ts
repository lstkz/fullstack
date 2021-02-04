import { mocked } from 'ts-jest/utils';
import { OrderInvoiceCollection } from '../../src/collections/OrderInvoice';
import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { UserCollection } from '../../src/collections/User';
import { createInvoice, sendInvoiceByEmail } from '../../src/common/invoice';
import { createOrderInvoice } from '../../src/contracts/invoice/createOrderInvoice';
import { nextSeq } from '../../src/contracts/misc/nextSeq';
import { getId, setupDb } from '../helper';
import {
  createSubscriptionPlans,
  getCustomerData,
  getPrice,
  registerSampleUsers,
} from '../seed-data';

setupDb();

jest.mock('../../src/common/invoice');
jest.mock('../../src/dispatch');

const mocked_createInvoice = mocked(createInvoice);
const mocked_sendInvoiceByEmail = mocked(sendInvoiceByEmail);

beforeEach(async () => {
  await registerSampleUsers();
  await createSubscriptionPlans();
  await SubscriptionOrderCollection.insertMany([
    {
      _id: 'order-1',
      createdAt: new Date(),
      customer: {
        ...getCustomerData(),
        companyName: 'comp SA',
        companyVat: '123456',
      },
      planId: 'p1',
      price: getPrice(),
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
      userId: getId(1),
    },
    {
      _id: 'order-2',
      createdAt: new Date(),
      customer: getCustomerData(),
      planId: 'p1',
      price: getPrice(),
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
      userId: getId(1),
    },
  ]);
  mocked_createInvoice.mockClear();
  mocked_sendInvoiceByEmail.mockClear();
  mocked_createInvoice.mockImplementation(async () => ({ id: 44 }));
  Date.now = () => 1000;
});

it('should ignore if no companyVat', async () => {
  await createOrderInvoice('order-2');
  expect(mocked_createInvoice).not.toHaveBeenCalled();
  expect(await OrderInvoiceCollection.findAll({})).toHaveLength(0);
});

it('should create invoice successfully (without invoiceClientId)', async () => {
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices).toHaveLength(1);
  expect(invoices[0]).toMatchInlineSnapshot(`
    Object {
      "_id": "TEST/1/1",
      "createdAt": 1970-01-01T00:00:01.000Z,
      "externalId": 44,
      "isSent": true,
      "orderId": "order-1",
      "userId": "000000000000000000000001",
    }
  `);
  expect(mocked_createInvoice).toHaveBeenCalledTimes(1);
  expect(mocked_sendInvoiceByEmail).toHaveBeenCalledTimes(1);
  expect(mocked_createInvoice.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "buyer_city": "city",
        "buyer_email": "user1@example.com",
        "buyer_name": "comp SA",
        "buyer_post_code": "postalCode",
        "buyer_street": "address",
        "buyer_tax_no": "123456",
        "kind": "vat",
        "number": "TEST/1/1",
        "positions": Array [
          Object {
            "name": "plan",
            "quantity": 1,
            "tax": 23,
            "total_price_gross": 123,
          },
        ],
        "seller_city": "New York",
        "seller_name": "Seller SA",
        "seller_post_code": "122-45",
        "seller_street": "street",
        "seller_tax_no": "5252445767",
      },
    ]
  `);
  expect(mocked_sendInvoiceByEmail).toBeCalledWith(44);
});

it('should create invoice successfully (with invoiceClientId)', async () => {
  await UserCollection.findOneAndUpdate(
    {
      _id: getId(1),
    },
    {
      $set: {
        invoiceClientId: 1000,
      },
    }
  );
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices).toHaveLength(1);
  expect(invoices[0]).toMatchInlineSnapshot(`
    Object {
      "_id": "TEST/1000/1",
      "createdAt": 1970-01-01T00:00:01.000Z,
      "externalId": 44,
      "isSent": true,
      "orderId": "order-1",
      "userId": "000000000000000000000001",
    }
  `);
  expect(mocked_createInvoice).toHaveBeenCalledTimes(1);
  expect(mocked_sendInvoiceByEmail).toHaveBeenCalledTimes(1);
});

it('should create invoice with increasing number', async () => {
  await nextSeq(`INVOICE_NO:1`);
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices[0]._id).toEqual('TEST/1/2');
});

it('should process only once', async () => {
  await nextSeq(`INVOICE_NO:1`);
  await createOrderInvoice('order-1');
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices).toHaveLength(1);
  expect(mocked_createInvoice).toHaveBeenCalledTimes(1);
  expect(mocked_sendInvoiceByEmail).toHaveBeenCalledTimes(1);
});

it('createInvoice failing', async () => {
  mocked_createInvoice.mockImplementationOnce(() => {
    throw new Error('foo');
  });
  await createOrderInvoice('order-1').catch(() => {});
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices).toHaveLength(1);
  expect(invoices[0]._id).toEqual('TEST/1/1');
});

it('sendInvoiceByEmail failing', async () => {
  mocked_sendInvoiceByEmail.mockImplementationOnce(() => {
    throw new Error('foo');
  });
  await createOrderInvoice('order-1').catch(() => {});
  await createOrderInvoice('order-1');
  const invoices = await OrderInvoiceCollection.findAll({});
  expect(invoices).toHaveLength(1);
  expect(invoices[0]._id).toEqual('TEST/1/1');
});
