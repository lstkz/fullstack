import { ModuleTaskDetails } from 'shared';
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

let task: ModuleTaskDetails = null!;

let videoSolution = {
  type: 'ok' as const,
  sources: [
    {
      resolution: '720p',
      url: 'about:blank',
    },
  ],
};

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
  task = {
    detailsUrl: `http://localhost:${API_PORT}/bundle.js`,
    id: 1,
    isExample: false,
    moduleId: 'm-1',
    name: 'Sample Task',
    hasHint: true,
    hasVideoSolution: true,
    htmlUrl: `http://localhost:${API_PORT}/task.html`,
    isHintOpened: false,
    isSolutionOpened: false,
    isSolved: false,
    nextTask: null,
    score: 0,
    practiceTime: 0,
  };
  engine.mock('module_getTask', () => {
    return task;
  });

  mock_assignVM = engine.mock('vm_assignVM', count => {
    return {
      isReady: notReadyCount < count,
    };
  });
  mock_prepareFolder = engine.mock('vm_prepareFolder', count => {
    return {
      url: notPreparedCount < count ? 'about:blank#/task' : null,
    };
  });
});

async function _navigate() {
  await page.goto(WEBSITE_URL + '/module/m-1/task/1');
  await $('@task-details').expect.toMatch('Example Task');
}

async function _openAndAssert(assignCount, prepareCount) {
  await _navigate();
  await $('@task-iframe').expect.toBeVisible();
  expect(mock_assignVM).toBeCalledTimes(assignCount);
  expect(mock_prepareFolder).toBeCalledTimes(prepareCount);
}

describe('task loading', () => {
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

describe('task hint', () => {
  it('hint should be not visible if hasHint=false', async () => {
    task.hasHint = false;
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').expect.toBeVisible();
    await $('@hint-btn').expect.toBeHidden();
  });

  it('should show a confirm warning and time info pending', async () => {
    engine.mock('module_getTaskHint', () => {
      return {
        remainingTime: 1,
        type: 'wait' as const,
        waitTime: 1,
      };
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@hint-btn').click();
    await $('@confirm-modal').expect.toBeVisible();
    await $('@confirm-modal @yes-btn').click();
    await $('@confirm-modal').expect.toBeHidden();
    await $('@hint-pending-modal').expect.toBeVisible();
    await $('@hint-pending-modal @close-btn').click();
    await $('@hint-pending-modal').expect.toBeHidden();
  });

  it('should show a confirm warning and hint', async () => {
    engine.setMockedHint('task hint abc');
    engine.mock('module_getTaskHint', () => {
      return {
        type: 'ok' as const,
        url: `http://localhost:${API_PORT}/hint.html`,
      };
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@hint-btn').click();
    await $('@confirm-modal').expect.toBeVisible();
    await $('@confirm-modal @yes-btn').click();
    await $('@hint-modal').expect.toBeVisible();
    await $('@hint-modal @hint-content').expect.toMatch('task hint abc');
    await $('@hint-modal @close-btn').click();
    await $('@hint-modal').expect.toBeHidden();
    // open again
    await $('@task-help-menu').click();
    await $('@hint-btn').click();
    await $('@hint-modal').expect.toBeVisible();
  });

  it('should show a hint without warning if already opened', async () => {
    task.isHintOpened = true;
    engine.setMockedHint('task hint abc');
    engine.mock('module_getTaskHint', () => {
      return {
        type: 'ok' as const,
        url: `http://localhost:${API_PORT}/hint.html`,
      };
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@hint-btn').click();
    await $('@hint-modal').expect.toBeVisible();
  });
});

describe('video solution', () => {
  it('video should be not visible if hasVideoSolution=false', async () => {
    task.hasVideoSolution = false;
    await _navigate();
    await $('@task-help-menu').click();
    await $('@hint-btn').expect.toBeVisible();
    await $('@solution-btn').expect.toBeHidden();
  });

  it('should show a hint required modal', async () => {
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@hint-required-modal').expect.toBeVisible();
    await $('@hint-required-modal @close-btn').click();
    await $('@hint-required-modal').expect.toBeHidden();
  });

  it('should show a confirm warning and time info pending', async () => {
    task.isHintOpened = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return {
        remainingTime: 1,
        type: 'wait' as const,
        waitTime: 1,
      };
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@confirm-modal').expect.toBeVisible();
    await $('@confirm-modal @yes-btn').click();
    await $('@confirm-modal').expect.toBeHidden();
    await $('@solution-pending-modal').expect.toBeVisible();
    await $('@solution-pending-modal @close-btn').click();
    await $('@solution-pending-modal').expect.toBeHidden();
  });

  it('should show a confirm warning and video', async () => {
    task.isHintOpened = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return videoSolution;
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@confirm-modal').expect.toBeVisible();
    await $('@confirm-modal @yes-btn').click();
    await $('@player-modal').expect.toBeVisible();
    await $('@player-modal @close-btn').click();
    await $('@player-modal').expect.toBeHidden();
    // open again
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@player-modal').expect.toBeVisible();
  });

  it('should not show a warning if already opened', async () => {
    task.isHintOpened = true;
    task.isSolutionOpened = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return videoSolution;
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@player-modal').expect.toBeVisible();
  });

  it('should not show a warning if example', async () => {
    task.hasHint = false;
    task.isExample = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return videoSolution;
    });
    await _navigate();
    await $('@task-help-menu').click();
    await $('@solution-btn').click();
    await $('@player-modal').expect.toBeVisible();
  });

  it('should open a video solution if example', async () => {
    task.isExample = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return videoSolution;
    });
    await _navigate();
    await $('@watch-btn').click();
    await $('@player-modal').expect.toBeVisible();
  });

  it('should open a video solution if solved', async () => {
    task.isSolved = true;
    engine.mock('module_getTaskVideoSolution', () => {
      return videoSolution;
    });
    await _navigate();
    await $('@watch-btn').click();
    await $('@player-modal').expect.toBeVisible();
  });
});
