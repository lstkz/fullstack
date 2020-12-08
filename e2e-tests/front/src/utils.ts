import { Page } from 'puppeteer';
import { WEBSITE_URL } from './config';
import { Engine } from './lib/Engine';

export function initEngine(page: Page) {
  let engine = new Engine();

  beforeAll(async () => {
    await engine.setup();
  });
  beforeEach(async () => {
    await (page as any)._client.send('Storage.clearDataForOrigin', {
      origin: WEBSITE_URL,
      storageTypes:
        'appcache,cache_storage,cookies,indexeddb,local_storage,service_workers,websql',
    });
    engine.resetMock();
  });
  afterAll(async () => {
    await engine.dispose();
  });

  return engine;
}
