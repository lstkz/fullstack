import crypto from 'crypto';
import cryptoAsync from 'mz/crypto';
import { Response } from 'node-fetch';
import { AppUser } from '../types';

const SECURITY = {
  SALT_LENGTH: 64,
  ITERATIONS: 4096,
  PASSWORD_LENGTH: 64,
};

export function renameId<T extends { _id: any }>(
  obj: T
): Omit<T, '_id'> & { id: string } {
  const ret: any = { ...obj };
  ret.id = ret._id.toString();
  delete ret._id;
  return ret;
}

export function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
}

export function randomUniqString() {
  return randomString(15);
}

export async function hashPassword(password: string, salt: string) {
  const buffer = await cryptoAsync.pbkdf2(
    password,
    salt,
    process.env.NODE_ENV === 'production' ? 100000 : 100,
    512,
    'sha512'
  );
  return buffer.toString('hex');
}

export function randomString(len: number) {
  const charSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = randomInt() % charSet.length;
    randomString += charSet[randomPoz];
  }
  return randomString;
}

export function safeAssign<T>(obj: T, values: Partial<T>) {
  return Object.assign(obj, values);
}

export function safeExtend<T, U>(obj: T, values: U): T & U {
  return Object.assign(obj, values);
}

export function safeKeys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as any;
}

export function randomItem<T>(items: T[]) {
  const idx = randomInt() % items.length;
  return items[idx];
}

export async function randomSalt() {
  const buffer = await cryptoAsync.randomBytes(SECURITY.SALT_LENGTH);
  return buffer.toString('hex');
}

export async function createPasswordHash(password: string, salt: string) {
  const hash = await cryptoAsync.pbkdf2(
    password,
    salt,
    SECURITY.ITERATIONS,
    SECURITY.PASSWORD_LENGTH,
    'sha1'
  );
  return hash.toString('hex');
}

export function getDuration(n: number, type: 's' | 'm' | 'h' | 'd') {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = 24 * hours;
  switch (type) {
    case 's': {
      return n * seconds;
    }
    case 'm': {
      return n * minutes;
    }
    case 'h': {
      return n * hours;
    }
    case 'd': {
      return n * days;
    }
  }
}

export async function getResponseBody<T = any>(opName: string, res: Response) {
  if (res.status !== 200) {
    const msg = `${opName} failed with code: ${res.status}`;
    console.error(msg, {
      responseText: await res.text(),
    });
    throw new Error(msg);
  }
  const body = await res.json();
  if (body.error) {
    const msg = `${opName} failed with code: ${
      body.error_description || body.error
    }`;
    console.error(msg, {
      body,
    });
    throw new Error(msg);
  }
  return body as T;
}

export function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getPreparedTaskId({
  awsId,
  moduleId,
  taskId,
}: {
  awsId: string;
  moduleId: string;
  taskId: number;
}) {
  return `${awsId}:${moduleId}:${taskId}`;
}

const DELAY_MS = process.env.NODE_ENV === 'test' ? 1 : 100;
const RETRY_COUNT = process.env.NODE_ENV === 'test' ? 10 : 120;

export async function createWaiter<
  T extends () => Promise<{ ok: false } | { ok: true; result: R }>,
  R
>(fn: T, errorMessage: string): Promise<R> {
  const run = async (retry = 0): Promise<R> => {
    if (retry > RETRY_COUNT) {
      throw new Error(errorMessage);
    }
    const ret = await fn();
    if (ret.ok) {
      return ret.result;
    }
    await delay(DELAY_MS);
    return run(retry + 1);
  };
  return run();
}

export function getDefaultVMId(user: AppUser) {
  return `default-${user._id}`;
}

export function getCurrentDate() {
  return new Date(Date.now());
}
