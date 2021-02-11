import mixpanel from 'mixpanel-browser';
import { IS_SSR, MIXPANEL_API_KEY } from './config';

type TrackEvent =
  | {
      type: 'landing_viewed';
    }
  | {
      type: 'landing_try_clicked';
    }
  | {
      type: 'landing_purchase_section_viewed';
    }
  | {
      type: 'pricing_try_clicked';
    }
  | {
      type: 'pricing_purchase_clicked';
    }
  | {
      type: 'subscription_viewed';
    }
  | {
      type: 'subscription_initiated';
    }
  | {
      type: 'modules_viewed';
    }
  | {
      type: 'module_viewed';
      moduleId: string;
    }
  | {
      type: 'task_viewed';
      taskId: number;
      moduleId: string;
    }
  | {
      type: 'lesson_viewed';
      lessonId: number;
      moduleId: string;
    }
  | {
      type: 'lesson_watched';
      lessonId: number;
      moduleId: string;
    }
  | {
      type: 'task_hint_viewed';
      taskId: number;
      moduleId: string;
      isSolved: boolean;
    }
  | {
      type: 'task_solution_viewed';
      taskId: number;
      moduleId: string;
      isSolved: boolean;
    }
  | {
      type: 'header_buy_clicked';
    };

export function track(data: TrackEvent) {
  if (process.env.NODE_ENV === 'development') {
    console.log('track', data);
  }
  if (IS_SSR || MIXPANEL_API_KEY == '-1') {
    return;
  }
  mixpanel.track(data.type);
}

export function setTrackingAlias(alias: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('setTrackingAlias', alias);
  }
  mixpanel.alias(alias);
}

export function setTrackingIdentify(id: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('setTrackingIdentify', id);
  }
  mixpanel.identify(id);
}

export function fbTrack(name: 'Subscribe' | 'CompleteRegistration') {
  if (process.env.NODE_ENV === 'development') {
    console.log('fbTrack', name);
  }
  try {
    const fbq: (type: string, name: string) => void = (window as any).fbq;
    fbq('track', name);
  } catch (e) {
    //
  }
}
