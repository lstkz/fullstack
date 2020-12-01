import fs from 'fs';
import * as Path from 'path';
import { decrypt, encrypt } from './cipher';
import { AppConfig } from './types';

type ConfigType = 'stage' | 'prod';

function getPassword(type: ConfigType) {
  const prop = `${type}_CONFIG_PASSWORD`.toUpperCase();
  const password = process.env[prop];
  if (!password) {
    throw new Error('Password config not defined: ' + prop);
  }
  return password;
}

function getConfig(): AppConfig {
  const type = (process.env.CONFIG_NAME || 'dev') as ConfigType | 'dev';
  if (!['dev', 'stage', 'prod'].includes(type)) {
    throw new Error('Invalid config name: ' + type);
  }
  if (type === 'dev') {
    return require('./dev').config;
  }
  const password = getPassword(type);
  const encrypted = fs.readFileSync(getEncryptedPath(type), 'utf8');
  return decrypt(encrypted, password);
}

export function encryptConfig(type: ConfigType) {
  const config = require('./' + type).config;
  if (!config) {
    throw new Error('Invalid config');
  }
  const password = getPassword(type);
  const encrypted = encrypt(config, password);
  fs.writeFileSync(getEncryptedPath(type), encrypted);
}

function getEncryptedPath(type: ConfigType) {
  return Path.join(__dirname, `${type}.encrypted.txt`);
}

export const config = getConfig();
