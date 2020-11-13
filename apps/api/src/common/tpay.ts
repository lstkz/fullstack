import fetch from 'node-fetch';
import {
  TPAY_API_KEY,
  TPAY_CODE,
  TPAY_CUSTOMER_ID,
  TPAY_PASSWORD,
} from '../config';
import { md5 } from './helper';

interface TPayGroup {
  id: number;
  name: string;
  banks: string;
  img: string;
  main_bank_id: number;
}

const BASE_URL = 'https://secure.tpay.com';

export async function getTPayGroups(): Promise<TPayGroup[]> {
  const url = `${BASE_URL}/groups-${TPAY_CUSTOMER_ID}1.js?json`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const groups: TPayGroup[] = await res.json();
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
  const url = `${BASE_URL}/api/gw/${TPAY_API_KEY}/transaction/create`;

  const requestBody = {
    id: TPAY_CUSTOMER_ID,
    ...options,
    md5sum: md5(
      String(TPAY_CUSTOMER_ID) +
        String(options.amount) +
        options.crc +
        TPAY_CODE
    ),
    accept_tos: 1,
    api_password: TPAY_PASSWORD,
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
