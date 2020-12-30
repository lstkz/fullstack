import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { AuthData } from 'shared';
import { getErrorMessage } from 'src/common/helper';
import { useAuthActions } from 'src/features/AuthModule';
import { setAccessToken } from 'src/services/Storage';

interface UseAuthFormOptions {
  submit: () => Promise<AuthData>;
}

export function useAuthForm(options: UseAuthFormOptions) {
  const { submit } = options;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const authActions = useAuthActions();
  const router = useRouter();

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const ret = await submit();
      setAccessToken(ret.token);
      authActions.setUser(ret.user);
      await router.push('/modules');
    } catch (e) {
      setError(getErrorMessage(e));
    }
    setIsSubmitting(false);
  };

  return {
    error,
    isSubmitting,
    onSubmit,
  };
}
