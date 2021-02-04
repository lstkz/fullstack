import { getResponseBody } from './helper';
import { config } from 'config';
import fetch from 'node-fetch';

interface InvoicePosition {
  name: string;
  tax: number;
  total_price_gross: number;
  quantity: number;
}

interface CreateInvoiceValues {
  kind: 'vat';
  number: string;
  seller_name: string;
  seller_tax_no: string;
  seller_street: string;
  seller_post_code: string;
  seller_city: string;
  buyer_name: string;
  buyer_tax_no: string;
  buyer_post_code: string;
  buyer_city: string;
  buyer_street: string;
  buyer_email: string;
  positions: InvoicePosition[];
}

interface Invoice {
  id: number;
}

function getBaseUrl() {
  return `https://${config.fakturownia.domain}.fakturownia.pl`;
}

function getHeaders() {
  const ret: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  return ret;
}

export async function createInvoice(
  values: CreateInvoiceValues
): Promise<Invoice> {
  const res = await fetch(`${getBaseUrl()}/invoices.json`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      api_token: config.fakturownia.apiToken,
      invoice: values,
    }),
  });
  return getResponseBody('Create invoice', res);
}

export async function sendInvoiceByEmail(id: number) {
  const res = await fetch(
    `${getBaseUrl()}/invoices/${id}/send_by_email.json?api_token=${
      config.fakturownia.apiToken
    }`,
    {
      method: 'POST',
      headers: getHeaders(),
    }
  );
  await getResponseBody('Send invoice by email invoice', res);
}
