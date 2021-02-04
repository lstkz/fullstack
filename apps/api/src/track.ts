import { config } from 'config';
import mixpanel from 'mixpanel';
import { ObjectID } from 'mongodb';
import { logger } from './common/logger';
import { MIXPANEL_API_URL } from './middlewares/trackMiddleware';

type TrackEvent =
  | {
      type: 'registered';
    }
  | {
      type: 'logged_in';
    }
  | {
      type: 'subscription_complete';
      planId: string;
    }
  | {
      type: 'task_solved';
      moduleId: string;
      taskId: number;
    };

let client: mixpanel.Mixpanel | null = null;

if (config.mixpanel.apiKey !== -1) {
  client = mixpanel.init(config.mixpanel.apiKey, {
    api_host: MIXPANEL_API_URL,
  });
}

export function track(id: string | ObjectID, data: TrackEvent) {
  if (process.env.NODE_ENV === 'development') {
    console.log('track', data);
  }
  if (!client) {
    return;
  }
  client.track(
    data.type,
    {
      distinct_id: id,
    },
    err => {
      if (err) {
        logger.error('mixpanel error', err);
      }
    }
  );
}
