import React from 'react';
import { LoginView } from 'src/features/login/components/LoginView';
import { RegisterView } from 'src/features/register/components/RegisterView';
import { ResetPasswordView } from 'src/features/resetPassword/components/ResetPasswordView';
import { SubscriptionModals } from 'src/features/subscription/components/SubscriptionModals';
import { ErrorModal } from './ErrorModal';

export function GlobalModals() {
  return (
    <>
      <SubscriptionModals />
      <LoginView isModal />
      <RegisterView isModal />
      <ResetPasswordView isModal />
      <ErrorModal />
    </>
  );
}
