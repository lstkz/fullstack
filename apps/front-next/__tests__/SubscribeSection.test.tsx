import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render } from './testUtils';
import { SubscriptionModalsModule } from 'src/features/SubscriptionModalsModule';
import { ErrorModalModule } from 'src/features/ErrorModalModule';
import { fireEvent, screen } from '@testing-library/react';
import { api } from 'src/services/api';
import { SubscribeSection } from 'src/features/landing/SubscribeSection';
import { act } from 'react-dom/test-utils';

const mockedApi = mocked(api);

function _run() {
  return render(
    <SubscriptionModalsModule>
      <ErrorModalModule>
        <SubscribeSection />
      </ErrorModalModule>
    </SubscriptionModalsModule>,
    {}
  );
}

it('error when no input', async () => {
  await _run();

  await act(async () => {
    screen.getByTestId('SubscribeBtn').click();
  });
  expect(
    screen.getByTestId('SubscribeValidation').textContent
  ).toMatchInlineSnapshot(`"Podaj adres email"`);
});

it('error when invalid email', async () => {
  await _run();

  await act(async () => {
    fireEvent.change(screen.getByTestId('SubscribeEmail'), {
      target: { value: 'foo' },
    });
    screen.getByTestId('SubscribeBtn').click();
  });
  expect(
    screen.getByTestId('SubscribeValidation').textContent
  ).toMatchInlineSnapshot(`"Niepoprawny email"`);
});

it('should subscribe', async () => {
  api.emailSubscription_subscribe = jest.fn(async () => {
    return {
      result: 'ok' as const,
    };
  });

  await _run();
  await act(async () => {
    fireEvent.change(screen.getByTestId('SubscribeEmail'), {
      target: { value: 'email@example.org' },
    });
    screen.getByTestId('SubscribeBtn').click();
  });
  expect(screen.queryByTestId('SubConfirmModal')).toBeVisible();
  expect(mockedApi.emailSubscription_subscribe).toBeCalledWith(
    null,
    'email@example.org'
  );
});

it('already-subscribed', async () => {
  api.emailSubscription_subscribe = jest.fn(async () => {
    return {
      result: 'already-subscribed' as const,
    };
  });

  await _run();
  await act(async () => {
    fireEvent.change(screen.getByTestId('SubscribeEmail'), {
      target: { value: 'email@example.org' },
    });
    screen.getByTestId('SubscribeBtn').click();
  });
  expect(screen.queryByTestId('SubAlreadyModal')).toBeVisible();
  expect(mockedApi.emailSubscription_subscribe).toBeCalledWith(
    null,
    'email@example.org'
  );
});
