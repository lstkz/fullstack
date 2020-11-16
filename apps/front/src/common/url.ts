import { getRouterState, RouterLocation } from 'typeless-router';
import * as R from 'remeda';

export type UrlOptions =
  | {
      name: 'login';
    }
  | {
      name: 'register';
    }
  | {
      name: 'reset-password';
    }
  | {
      name: 'courses';
    }
  | {
      name: 'course';
      id: string;
    }
  | {
      name: 'buy-course';
      id: string;
    }
  | {
      name: 'home';
    }
  | {
      name: 'settings';
    }
  | {
      name: 'contact-us';
    }
  | {
      name: 'tos';
    }
  | {
      name: 'privacy';
    };

export function createUrl(options: UrlOptions) {
  switch (options.name) {
    case 'home':
      return '/courses';
    case 'tos':
      return '/terms';
    case 'course':
      return '/course/' + options.id;
    case 'buy-course':
      return '/buy-course/' + options.id;
    default:
      return '/' + options.name;
  }
}

export function getRouteParams(name: 'reset-password'): { code: string };
export function getRouteParams(name: 'confirm'): { code: string };
export function getRouteParams(name: 'confirm-change-email'): { code: string };
export function getRouteParams(
  name:
    | 'reset-password'
    | 'challenge'
    | 'project'
    | 'confirm'
    | 'profile'
    | 'confirm-change-email'
    | 'faq'
    | 'projectChallenge'
): any {
  const location = getRouterState().location!;
  const getLast = () => R.last(location.pathname.split('/'));
  switch (name) {
    case 'confirm':
    case 'confirm-change-email':
    case 'reset-password': {
      return {
        code: getLast(),
      };
    }
    case 'project':
    case 'challenge': {
      return {
        id: Number(getLast()),
      };
    }
    case 'projectChallenge': {
      const [, , projectId, , challengeId] = location.pathname.split('/');
      return {
        projectId: Number(projectId),
        id: Number(challengeId),
      };
    }
    case 'profile': {
      return {
        username: getLast(),
      };
    }
    case 'faq': {
      return {
        slug: location.pathname === '/faq' ? null : getLast(),
      };
    }
  }
}

export function isRoute(
  name: 'register' | 'login' | 'reset-password',
  location?: RouterLocation | null
): boolean {
  const { pathname } = location || getRouterState().location!;
  switch (name) {
    default: {
      return pathname === createUrl({ name });
    }
  }
  return false;
}

export function parseQueryString(qs: string | null | undefined) {
  return (qs || '')
    .replace(/^\?/, '')
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      if (key) {
        params[key] = value ? decodeURIComponent(value) : '';
      }
      return params;
    }, {} as Record<string, string>);
}

export function stringifyQueryString(
  params: Record<string, string | number>,
  noEncode = false
) {
  if (!params) {
    return '';
  }
  const keys = Object.keys(params).filter(key => key.length > 0);
  if (!keys.length) {
    return '';
  }
  return (
    '?' +
    keys
      .map(key => {
        if (params[key] == null) {
          return key;
        }
        const value = params[key].toString();
        return `${key}=${noEncode ? value : encodeURIComponent(value)}`;
      })
      .join('&')
  );
}
