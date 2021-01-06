import * as DateFns from 'date-fns';
import { GetServerSideProps, NextPageContext } from 'next';
import { APIClient } from 'shared';
import classNames from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';
import { API_URL, DISABLE_APP } from 'src/config';
import { readCookieFromString } from './cookie';
import { ClassValue } from 'classnames/types';

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

export function getSolutionsSortCriteria(
  sortOrder: 'likes' | 'newest' | 'oldest'
) {
  return sortOrder === 'newest'
    ? {
        sortBy: 'date' as const,
        sortDesc: true,
      }
    : sortOrder === 'oldest'
    ? {
        sortBy: 'date' as const,
        sortDesc: false,
      }
    : {
        sortBy: 'likes' as const,
        sortDesc: true,
      };
}

export function countryListItemToOption({
  code,
  name,
  emoji,
}: {
  code: string;
  name: string;
  emoji: string;
}) {
  return {
    value: code,
    label: `${emoji} ${name}`,
  };
}

export function parseFilterValue(str: string, allowed?: string[]) {
  const value = (str || '').trim().toLowerCase();
  if (!allowed || allowed.includes(value)) {
    return value;
  } else {
    return null;
  }
}

export function parseFilterValues(str: string, allowed?: string[]) {
  const values = (str || '')
    .split(',')
    .map(x => parseFilterValue(x, allowed))
    .filter(x => x) as string[];
  return values;
}

export function parseFilterMap(str: string, allowed?: string[]) {
  const values = parseFilterValues(str, allowed);
  return values.reduce((ret, value) => {
    ret[value] = value;
    return ret;
  }, {} as any);
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substr(1);
}

export function toggleMapValue<
  T extends Record<string, string | undefined>,
  K extends string
>(map: T, value: K): T {
  const copy = { ...map };
  if (copy[value]) {
    delete copy[value];
  } else {
    (copy as any)[value] = value;
  }
  return copy;
}

export function opacityHex(hex: string, opacity: number) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex: ' + hex);
  }

  const parts = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    opacity,
  ];
  return `rgba(${parts.join(', ')})`;
}

export function isMenuHighlighted(
  pathname: string,
  menu: 'courses' | 'settings'
) {
  switch (menu) {
    case 'courses':
      return pathname === '/' || pathname.startsWith('/courses');
    case 'settings':
      return pathname === '/settings';
    default:
      throw new UnreachableCaseError(menu);
  }
}

export const isConfirmKey = (code: string) => code === 'Enter' || code === ' ';

export const ensureNotLoggedIn: GetServerSideProps = async context => {
  if (readCookieFromString(context.req.headers['cookie'], 'token')) {
    return {
      redirect: {
        destination: '/modules',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const wrapDisabled: (
  fn: GetServerSideProps
) => GetServerSideProps = fn => async context => {
  if (DISABLE_APP) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return fn(context);
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
    throw e;
  }
};
