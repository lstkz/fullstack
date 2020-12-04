import fetch from 'node-fetch';
import { TPayGroup } from 'shared';
import { md5 } from './helper';
import { config } from 'config';

const BASE_URL = 'https://secure.tpay.com';

export async function getTPayGroups(): Promise<TPayGroup[]> {
  const url = `${BASE_URL}/groups-${config.tpay.customerId}1.js?json`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body: Record<string, TPayGroup> = await res.json();
  const groups = Object.values(body);
  groups.forEach(group => {
    group.id = Number(group.id);
    group.main_bank_id = Number(group.main_bank_id);
  });
  return groups;
}

interface CreateTPayTransactionOptions {
  amount: number;
  description: string;
  crc: string;
  online: number;
  group: number;
  result_url: string;
  result_email: string;
  merchant_description: string;
  return_url: string;
  return_error_url: string;
  language: string;
  email: string;
  name: string;
}

export interface TPayTransaction {
  id: string;
  url: string;
}

export async function createTPayTransaction(
  options: CreateTPayTransactionOptions
) {
  const url = `${BASE_URL}/api/gw/${config.tpay.apiKey}/transaction/create`;

  const requestBody = {
    id: config.tpay.customerId,
    ...options,
    md5sum: md5(
      String(config.tpay.customerId) +
        String(options.amount) +
        options.crc +
        config.tpay.code
    ),
    accept_tos: 1,
    api_password: config.tpay.password,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const resText = await res.text();
  let body:
    | {
        result: 1;
        title: string;
        url: string;
      }
    | {
        result: 0;
        err: string;
        desc: string;
      } = null!;
  try {
    body = JSON.parse(resText);
  } catch (e) {
    console.error(
      'tpay fail',
      JSON.stringify({
        url,
        resText,
        values: requestBody,
      })
    );
    throw new Error('Unknown response from tpay: ' + resText);
  }
  if (body.result) {
    return {
      id: body.title,
      url: body.url,
    };
  }
  console.error(
    'tpay fail',
    JSON.stringify({
      url,
      body,
      values: requestBody,
    })
  );
  throw new Error(`TPay error: ${body.desc} ${body.err}`);
}
