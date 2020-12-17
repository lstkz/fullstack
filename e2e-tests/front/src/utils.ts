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

export async function waitForCall(
  spy: jest.MockInstance<Promise<any>, any>,
  count: number
) {
  return new Promise<void>((resolve, reject) => {
    const check = async (retry = 0) => {
      if (spy.mock.results.length === count) {
        await Promise.all(
          spy.mock.results.slice(0, count).map(x => x.value?.catch(() => null))
        );
        return resolve();
      }
      if (retry > 200) {
        return reject(new Error('waitForCall timeout'));
      }
      setTimeout(check, 10);
    };
    void check().catch(reject);
  });
}
