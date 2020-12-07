import React from 'react';
import { mocked } from 'ts-jest/utils';
import { getByTestId, mockFn, render } from './testUtils';
import { ConfirmEmailChecker } from '../src/features/ConfirmEmailChecker';
import { SubscriptionModalsModule } from 'src/features/SubscriptionModalsModule';
import { ErrorModalModule } from 'src/features/ErrorModalModule';
import { NextRouter } from 'next/router';
import { act } from 'react-dom/test-utils';
import { api } from 'src/services/api';

const mockedApi = mocked(api);

const replace = mockFn<NextRouter['replace']>();

beforeEach(() => {
  replace.mockReset();
});

function _run(query: Record<string, string>) {
  return act(async () => {
    render(
      <SubscriptionModalsModule>
        <ErrorModalModule>
          <ConfirmEmailChecker />
        </ErrorModalModule>
      </SubscriptionModalsModule>,
      {
        router: {
          pathname: '/foo',
          query: query,
          replace,
        },
      }
    );
  });
}

it('should confirm code', async () => {
  api.emailSubscription_confirmSubscription = jest.fn(async () => {});

  await _run({
    'confirm-email': 'adb',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_confirmSubscription).toBeCalledWith('adb');
  expect(getByTestId('SubConfirmedModal')).toBeTruthy();
  expect(getByTestId('ErrorModal')).toBeFalsy();
});

it('error when confirm code', async () => {
  api.emailSubscription_confirmSubscription = jest.fn(async () => {
    throw new Error('foo');
  });

  await _run({
    'confirm-email': 'adb',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_confirmSubscription).toBeCalledWith('adb');
  expect(getByTestId('SubConfirmedModal')).toBeFalsy();
  expect(getByTestId('ErrorModal')).toBeTruthy();
});

it('should unsubscribe', async () => {
  api.emailSubscription_unsubscribe = jest.fn(async () => {});

  await _run({
    email: 'a1',
    unsubscribe: 'a2',
    source: 'a3',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_unsubscribe).toBeCalledWith(
    'a1',
    'a2',
    'a3'
  );
  expect(getByTestId('SubRemovedModal')).toBeTruthy();
  expect(getByTestId('ErrorModal')).toBeFalsy();
});

it('error when unsubscribe', async () => {
  api.emailSubscription_unsubscribe = jest.fn(async () => {
    throw new Error('foo');
  });

  await _run({
    email: 'a1',
    unsubscribe: 'a2',
    source: 'a3',
    foo: 'bar',
  });

  expect(replace).toBeCalledWith({
    pathname: '/foo',
    query: {
      foo: 'bar',
    },
  });
  expect(mockedApi.emailSubscription_unsubscribe).toBeCalledWith(
    'a1',
    'a2',
    'a3'
  );
  expect(getByTestId('SubRemovedModal')).toBeFalsy();
  expect(getByTestId('ErrorModal')).toBeTruthy();
});
