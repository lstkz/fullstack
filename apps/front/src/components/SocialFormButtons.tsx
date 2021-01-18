import React from 'react';
import { GithubIcon } from 'src/icons/GithubIcon';
import { GoogleIcon } from 'src/icons/GoogleIcon';
import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from 'src/config';
import { useRouter } from 'next/dist/client/router';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { useErrorModalActions } from 'src/features/ErrorModalModule';
import { Button } from './Button';

interface SocialFormButtonsProps {
  source: 'login' | 'register';
  redirectUrl?: string;
}

export function SocialFormButtons(props: SocialFormButtonsProps) {
  const { source, redirectUrl } = props;
  const router = useRouter();
  const errorModalActions = useErrorModalActions();

  const github = useAuthForm({
    redirectUrl,
    submit: async () => {
      const fn =
        source === 'login' ? api.user_githubLogin : api.user_githubRegister;
      return fn.bind(api)(router.query.code as string);
    },
  });

  const google = useAuthForm({
    redirectUrl,
    submit: async () => {
      const fn =
        source === 'login' ? api.user_googleLogin : api.user_googleRegister;
      const token = /access_token=([^&]+)/.exec(window.location.hash)?.[1];
      if (!token) {
        throw new Error('access_token missing');
      }
      return fn.bind(api)(token);
    },
  });

  React.useEffect(() => {
    if (router.query.auth === 'github' && router.query.code) {
      void github.onSubmit();
    }
    if (router.query.auth === 'google') {
      void google.onSubmit();
    }
  }, [router.query]);

  React.useEffect(() => {
    if (github.error) {
      errorModalActions.show(github.error);
    }
  }, [github.error]);

  React.useEffect(() => {
    if (google.error) {
      errorModalActions.show(google.error);
    }
  }, [google.error]);

  return (
    <>
      <div className="text-xs my-4 uppercase text-center">lub</div>
      <div className="grid md:grid-cols-2 gap-8">
        <Button
          testId="social-github-btn"
          onClick={() => {
            const params = [
              `client_id=${GITHUB_CLIENT_ID}`,
              `redirect_uri=${encodeURIComponent(
                window.origin + `/${source}?auth=github`
              )}`,
              `scope=${encodeURIComponent('user:email')}`,
            ];
            window.location.href = `https://github.com/login/oauth/authorize?${params.join(
              '&'
            )}`;
          }}
          type="neutral"
          block
          icon={<GithubIcon size={20} />}
          loading={github.isSubmitting}
        >
          Github
        </Button>
        <Button
          testId="social-google-btn"
          onClick={() => {
            const params = [
              `client_id=${GOOGLE_CLIENT_ID}`,
              `redirect_uri=${encodeURIComponent(
                window.origin + `/${source}?auth=google`
              )}`,
              `scope=email`,
              `response_type=token`,
            ];
            window.location.href = `https://accounts.google.com/o/oauth2/auth?${params.join(
              '&'
            )}`;
          }}
          type="neutral"
          block
          icon={<GoogleIcon size={20} />}
          loading={google.isSubmitting}
        >
          Google
        </Button>
      </div>
    </>
  );
}
