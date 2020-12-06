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
