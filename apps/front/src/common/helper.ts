import * as DateFns from 'date-fns';
import { GetServerSideProps, NextPageContext } from 'next';
import { APIClient } from 'shared';
import classNames from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';
import { API_URL } from 'src/config';
import { readCookieFromString } from './cookie';
import { ClassValue } from 'classnames/types';
import { bugsnag } from 'src/bug-report';
import Bugsnag from '@bugsnag/js';

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(
      `Unreachable case: ${typeof val === 'string' ? val : JSON.stringify(val)}`
    );
  }
}

export function getErrorMessage(e: any) {
  if (e?.status === 0) {
    return 'Cannot connect to API';
  }
  const message = e?.response?.error || e.message;
  return message.replace('ContractError: ', '');
}

export const isConfirmKey = (code: string) => code === 'Enter' || code === ' ';

export const ensureNotLoggedIn: GetServerSideProps = async context => {
  const client = createSSRClient(context);
  if (client.getToken()) {
    try {
      await client.user_getMe();
      return {
        redirect: {
          destination: '/modules',
          permanent: false,
        },
      };
    } catch (e) {
      // ignore
    }
  }
  return {
    props: {},
  };
};

export function createSSRClient<
  T extends {
    req?: NextPageContext['req'];
  }
>(ctx: T) {
  const token = readCookieFromString(
    ctx?.req?.headers['cookie'] ?? '',
    'token'
  );
  return new APIClient(API_URL, () => token, fetch);
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

export function getTimeSuffix(n: number) {
  if (n === 1) {
    return 'a';
  }
  const rem100 = n % 100;
  if (rem100 > 10 && rem100 <= 20) {
    return '';
  }
  const rem10 = rem100 % 10;
  if (rem10 >= 2 && rem10 <= 4) {
    return 'y';
  }
  return '';
}

export function formatDuration(totalMinutes: number) {
  if (!totalMinutes) {
    return '0 godzin';
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return [
    hours && `${hours} godzin${getTimeSuffix(hours)}`,
    minutes && `${minutes} minut${getTimeSuffix(minutes)}`,
  ]
    .filter(Boolean)
    .join(' ');
}

export const cx = (...classes: ClassValue[]) =>
  overrideTailwindClasses(classNames(...classes));

export function formatShortDate(data: string | Date) {
  return DateFns.format(new Date(data), 'dd/MM/yyyy');
}

export const createGetServerSideProps: (
  fn: GetServerSideProps
) => GetServerSideProps = fn => async context => {
  try {
    return await fn(context);
  } catch (e) {
    const status = e.res?.status;
    if (status == 401) {
      context.res.setHeader(
        'Set-Cookie',
        'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      );
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    if (status == 403 && e.message == 'Subscription required') {
      return {
        redirect: {
          destination: '/subscription',
          permanent: false,
        },
      };
    }
    if (bugsnag) {
      const bugsnagEvent = Bugsnag.Event.create(
        e,
        false,
        {
          severity: 'error',
          unhandled: true,
          severityReason: {
            type: 'unhandledError',
          },
        },
        '',
        0
      );
      if (e.res) {
        try {
          bugsnagEvent.addMetadata('response', {
            url: e.res.url,
            status: e.res.status,
            body: e.body,
          });
        } catch (e) {
          // ignore
        }
      }
      bugsnag._notify(bugsnagEvent);
    }
    throw e;
  }
};
