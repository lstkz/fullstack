import React from 'react';
import * as R from 'remeda';
import { RouteResolver } from './RouteResolver';
import { useGlobalModule } from '../features/global/module';
import { useRouterModule } from '../features/router';
import { getGlobalState } from 'src/features/global/interface';
import { useMappedState } from 'typeless';
import { GlobalModals } from './GlobalModals';
import { useLoginModule } from 'src/features/login/module';
import { useRegisterModule } from 'src/features/register/module';
import { useResetPasswordModule } from 'src/features/resetPassword/module';
import { useSubscriptionModule } from 'src/features/subscription/module';
import { GlobalStyles } from 'src/new-components/GlobalStyles';

export function App() {
  useGlobalModule();
  useSubscriptionModule();
  useRouterModule();
  useLoginModule();
  useRegisterModule();
  useResetPasswordModule();

  const { isLoaded } = useMappedState([getGlobalState], R.pick(['isLoaded']));
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <GlobalStyles />
      <RouteResolver />
      <GlobalModals />
    </>
  );
}
