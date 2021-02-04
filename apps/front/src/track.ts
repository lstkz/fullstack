import mixpanel from 'mixpanel-browser';
import { IS_SSR, MIXPANEL_API_KEY } from './config';

type TrackEvent = {
  type:
    | 'landing_viewed'
    | 'landing_try_clicked'
    | 'landing_purchase_section_viewed'
    | 'pricing_try_clicked'
    | 'pricing_purchase_clicked'
    | 'subscription_viewed'
    | 'subscription_initiated';
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
