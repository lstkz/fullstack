import { GetServerSideProps, NextPageContext } from 'next';
import { APIClient } from 'shared';
import { API_URL, DISABLE_APP } from 'src/config';
import { readCookieFromString } from './cookie';

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

// export const handleAppError = () =>
//   Rx.catchLog<ActionLike, Rx.Observable<ActionLike>>((e: any) => {
//     return Rx.of(GlobalActions.showErrorModal(getErrorMessage(e)));
//   });

// interface HandleAuthOptions {
//   authData: AuthData;
//   reset: () => any;
//   action$: Rx.Observable<any>;
// }

// export function handleAuth(options: HandleAuthOptions) {
//   const { authData, reset, action$ } = options;
//   return Rx.mergeObs(
//     action$
//       .pipe(
//         Rx.waitForType(RouterActions.locationChange),
//         Rx.map(() => reset())
//       )
//       .pipe(Rx.delay(1000)),
//     Rx.of(GlobalActions.auth(authData))
//   );
// }

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

// const BUNDLE_ID = 'CHALLENGE_BUNDLE_SCRIPT';

// function removeBundle() {
//   const existing = document.getElementById(BUNDLE_ID);
//   if (existing) {
//     existing.remove();
//   }
// }

// export function loadBundle(detailsBundleS3Key: string) {
//   return new Rx.Observable<any>(subscriber => {
//     removeBundle();
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = PROTECTED_BASE_URL + detailsBundleS3Key;
//     script.setAttribute('id', BUNDLE_ID);
//     (window as any).ChallengeJSONP = (module: any) => {
//       subscriber.next(module.Details);
//       subscriber.complete();
//     };
//     document.body.appendChild(script);
//     return () => {
//       removeBundle();
//     };
//   });
// }

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
