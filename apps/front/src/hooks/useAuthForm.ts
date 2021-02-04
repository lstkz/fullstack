import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { AuthData } from 'shared';
import { getErrorMessage } from 'src/common/helper';
import { createUrl } from 'src/common/url';
import { useAuthActions } from 'src/features/AuthModule';
import { clearAccessToken, setAccessToken } from 'src/services/Storage';
import { setTrackingAlias, setTrackingIdentify } from 'src/track';

interface UseAuthFormOptions {
  isRegister?: boolean;
  submit: () => Promise<AuthData>;
  redirectUrl?: string;
}

export function useAuthForm(options: UseAuthFormOptions) {
  const { submit, redirectUrl, isRegister } = options;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const authActions = useAuthActions();
  const router = useRouter();

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      clearAccessToken();
      const ret = await submit();
      setAccessToken(ret.token);
      authActions.setUser(ret.user);
      if (isRegister) {
        setTrackingAlias(ret.user.id);
      } else {
        setTrackingIdentify(ret.user.id);
      }
      await router.push(redirectUrl ?? createUrl({ name: 'modules' }));
    } catch (e) {
      setError(getErrorMessage(e));
      setIsSubmitting(false);
    }
  };

  return {
    error,
    isSubmitting,
    onSubmit,
  };
}
