import React from 'react';
import { useChangePasswordModule } from '../module';
import {
  useChangePasswordForm,
  ChangePasswordFormProvider,
  ChangePasswordFormActions,
} from '../changePassword-form';
import { useActions } from 'typeless';
import { FullPageForm } from '../../../components/FullPageForm';
import { getChangePasswordState } from '../interface';
import { Alert } from 'src/components/Alert';
import { FormInput } from 'src/new-components/FormInput';
import { Button } from 'src/new-components/Button';

export function ChangePasswordView() {
  useChangePasswordForm();
  useChangePasswordModule();
  const { submit } = useActions(ChangePasswordFormActions);
  const { isSubmitting, error } = getChangePasswordState.useState();

  return (
    <FullPageForm title="Zmień Hasło" subTitle={<>Ustaw nowe hasło</>}>
      <ChangePasswordFormProvider>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          {error && <Alert type="error">{error}</Alert>}
          <FormInput
            id="password"
            name="password"
            label="Hasło"
            placeholder="********"
            type="password"
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            label="Potwórz hasło"
            placeholder="********"
            type="password"
          />
          <Button type="primary" block loading={isSubmitting} htmlType="submit">
            Zmień Hasło
          </Button>
        </form>
      </ChangePasswordFormProvider>
    </FullPageForm>
  );
}
