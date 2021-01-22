import mixpanel from 'mixpanel-browser';
import { IS_SSR, MIXPANEL_API_KEY } from './config';

type TrackEvent = {
  type: 'landing_page_viewed';
};

export function track(data: TrackEvent) {
  if (IS_SSR || MIXPANEL_API_KEY == '-1') {
    return;
  }
  mixpanel.track(data.type);
}
