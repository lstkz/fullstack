import { API_PORT, WEBSITE_URL } from './config';
import { initEngine, waitForCall } from './utils';

const engine = initEngine(page);

let mock_assignVM: jest.Mock<any, []> = null!;
let mock_prepareFolder: jest.Mock<
  any,
  [moduleId: string, taskId: number]
> = null!;

let notReadyCount = 0;
let notPreparedCount = 0;

beforeEach(() => {
  notReadyCount = 0;
  notPreparedCount = 0;
  engine.setToken('123');
  engine.setMockedBundle('Example Task');

  engine.mock('user_getMe', () => {
    return {
      email: 'user1@example.org',
      id: 'user1',
      isVerified: true,
    };
  });
  engine.mock('module_getTask', () => {
    return {
      detailsUrl: `http://localhost:${API_PORT}/bundle.js`,
      id: 1,
      isExample: false,
      moduleId: 'm-1',
      name: 'Sample Task',
    };
  });

  mock_assignVM = engine.mock('vm_assignVM', count => {
    return {
      isReady: notReadyCount < count,
    };
  });
  mock_prepareFolder = engine.mock('vm_prepareFolder', count => {
    return {
      url: notPreparedCount < count ? 'about:blank' : null,
    };
  });
});

async function _openAndAssert(assignCount, prepareCount) {
  await page.goto(WEBSITE_URL + '/module/m-1/task/1');
  await $('@task-details').expect.toMatch('Example Task');
  await $('@task-iframe').expect.toBeVisible();
  expect(mock_assignVM).toBeCalledTimes(assignCount);
  expect(mock_prepareFolder).toBeCalledTimes(prepareCount);
}

describe('task', () => {
  it('should open a task (ready, prepared)', async () => {
    await _openAndAssert(1, 1);
  });

  it('should open a task (not ready, not prepared)', async () => {
    notReadyCount = 1;
    notPreparedCount = 1;
    await _openAndAssert(2, 2);
  });

  it('should open a task (ready, not prepared)', async () => {
    notPreparedCount = 1;
    await _openAndAssert(1, 2);
  });

  it('should open a task (not ready, prepared)', async () => {
    notReadyCount = 1;
    await _openAndAssert(2, 1);
  });

  it('should ping on mouse move', async () => {
    const mock_pingVM = engine.mock('vm_pingVM', () => {});
    await _openAndAssert(1, 1);
    await page.mouse.move(10, 10);
    await waitForCall(mock_pingVM, 1);
    expect(mock_pingVM).toBeCalledTimes(1);
  });

  it('should ping on iframe message', async () => {
    const mock_pingVM = engine.mock('vm_pingVM', () => {});
    await _openAndAssert(1, 1);
    await page.evaluate(() => {
      const iframe = document.querySelector('iframe');
      iframe.contentWindow.top.postMessage('VM_PING', '*');
    });
    await waitForCall(mock_pingVM, 1);
    expect(mock_pingVM).toBeCalledTimes(1);
  });
});
