import crypto from 'crypto';
import cryptoAsync from 'mz/crypto';

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
    let randomPoz = randomInt() % charSet.length;
    randomString += charSet[randomPoz];
  }
  return randomString;
}

export function safeAssign<T>(obj: T, values: Partial<T>) {
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
