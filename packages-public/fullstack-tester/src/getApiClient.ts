import fs from 'fs';
import Path from 'path';
import os from 'os';
import fetch from 'node-fetch';
import { APIClient } from 'shared/src/APIClient';

export function getApiClient() {
  const tokenFile = Path.join(os.homedir(), '.fs-auth');
  if (!fs.existsSync(tokenFile)) {
    throw new Error('Auth file not found. Please refresh the page to fix it.');
  }
  let data: { apiUrl: string; token: string } | null = null;
  try {
    data = JSON.parse(fs.readFileSync(tokenFile, 'utf-8').trim());
  } catch (e) {
    throw new Error('Auth file corrupted. Please refresh the page to fix it.');
  }
  if (!data || !data.apiUrl || !data.token) {
    throw new Error('Auth file corrupted. Please refresh the page to fix it.');
  }
  return new APIClient(data.apiUrl, () => data!.token, fetch);
}
