import { config } from 'config';
import { AssignedVMCollection, VMStatus } from '../src/collections/AssignedVM';
import {
  ModuleCollection,
  ModuleModel,
  ModuleTaskModel,
} from '../src/collections/Module';
import { SubscriptionPlanCollection } from '../src/collections/SubscriptionPlan';
import { UserCollection } from '../src/collections/User';
import { md5 } from '../src/common/helper';
import { createToken } from '../src/contracts/user/createToken';
import { _createUser } from '../src/contracts/user/_createUser';
import { getId } from './helper';

export async function registerSampleUsers(isVerified = true) {
  await Promise.all([
    _createUser({
      userId: getId(1),
      email: 'user1@example.com',
      password: 'password1',
      isVerified: isVerified,
      subscribeNewsletter: true,
    }).then(() => createToken(getId(1), 'user1_token')),
    _createUser({
      userId: getId(2),
      email: 'user2@example.com',
      password: 'password2',
      isVerified: isVerified,
    }).then(() => createToken(getId(2), 'user2_token')),
  ]);
}

export async function addSubscription(id: number) {
  await UserCollection.findOneAndUpdate(
    {
      _id: getId(id),
    },
    {
      $set: {
        hasSubscription: true,
      },
    }
  );
}

export function getCustomerData() {
  return {
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
    id: config.tpay.customerId.toFixed(),
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
    md5sum: md5(
      `${config.tpay.customerId}${tr_id}${amount}${crc}${config.tpay.code}`
    ),
  };
}

export function getPrice() {
  return {
    net: 100,
    vatRate: 23,
    vat: 23,
    total: 123,
  };
}

export async function createSubscriptionPlans() {
  await SubscriptionPlanCollection.insertMany([
    {
      _id: 'p1',
      name: 'plan',
      price: {
        net: 100,
        vatRate: 23,
        vat: 23,
        total: 123,
      },
      pricePerMonth: 100,
      savings: 0,
      type: 'monthly',
    },
  ]);
}

export function getTaskData(id: number, isExample = false): ModuleTaskModel {
  return {
    id: id,
    name: `task ${id}`,
    isExample,
    detailsS3Key: `detailsS3Key_${id}.js`,
    sourceS3Key: `sourceS3Key_${id}.js`,
    htmlS3Key: `htmlS3Key_${id}.html`,
    hintHtmlS3Key: `hintHtmlS3Key_${id}.html`,
    videoSolution: [
      {
        type: '720',
        url: 'http://example.org/solution.mp4',
      },
    ],
    testsInfo: {
      files: [
        {
          hash: '111',
          path: 'main.ts',
        },
      ],
      resultHash: 'hash123',
    },
  };
}

export function getModuleData(id: number, isPending = false): ModuleModel {
  return {
    _id: `m${id}`,
    name: `module ${id}`,
    packageJson: '{}',
    description: `desc ${id}`,
    isPending: isPending,
    estimatedPracticeTimeHours: id * 10,
    lessons: [],
    tasks: [],
  };
}

export async function createModules() {
  await ModuleCollection.insertOne({
    _id: 'm1',
    name: 'module 1',
    description: 'test module 1',
    packageJson: '{}',
    isPending: false,
    lessons: [],
    estimatedPracticeTimeHours: 1,
    tasks: [
      {
        id: 1,
        name: 'task 1',
        isExample: false,
        detailsS3Key: 'detailsS3Key',
        sourceS3Key: 'sourceS3Key',
        htmlS3Key: 'htmlS3Key',
        hintHtmlS3Key: null,
        videoSolution: null,
        testsInfo: {
          files: [],
          resultHash: 'hash',
        },
      },
    ],
  });
}

export async function createVM(status: VMStatus = 'running', id?: string) {
  await AssignedVMCollection.insertOne({
    _id: id ?? `default-${getId(1)}`,
    tagId: '123',
    userId: getId(1),
    awsId: '444',
    baseDomain: 'example.org',
    domainPrefix: '999',
    domain: '999.example.org',
    status,
    lastPingTime: new Date(0),
  });
}

export function getAddSubscriberResult(
  id: number,
  state: 'active' | 'cancelled' = 'active'
) {
  return {
    created_at: '123',
    id: 100,
    referrer: null,
    source: '',
    state,
    subscribable_id: 200,
    subscribable_type: 'type',
    subscriber: {
      id,
    },
  };
}

export function getGetSubscriberResult(
  id: number,
  state: 'active' | 'cancelled' = 'active'
) {
  return {
    id,
    state,
    first_name: null,
    email_address: '',
    created_at: '',
    fields: {},
  };
}
