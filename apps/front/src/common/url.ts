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
      name: 'forgot-password';
    }
  | {
      name: 'module';
      id: string;
    }
  | {
      name: 'task';
      id: string;
      taskId: number;
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
    }
  | {
      name: 'modules';
    }
  | {
      name: 'subscription';
    }
  | {
      name: 'pricing';
    };

export function createUrl(options: UrlOptions) {
  switch (options.name) {
    case 'home':
      return '/modules';
    case 'tos':
      return '/terms';
    case 'module':
      return '/module/' + options.id;
    case 'task':
      return '/module/' + options.id + '/task/' + options.taskId;
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
