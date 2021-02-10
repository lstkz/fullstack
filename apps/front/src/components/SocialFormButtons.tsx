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
  subscribeNewsletter?: boolean;
  isValid?: boolean;
  validate?: () => void;
}

export function SocialFormButtons(props: SocialFormButtonsProps) {
  const { source, redirectUrl, subscribeNewsletter, isValid, validate } = props;
  const router = useRouter();
  const errorModalActions = useErrorModalActions();
  const getIsSubscribe = () => router.query.subscribeNewsletter === '1';

  const github = useAuthForm({
    redirectUrl,
    submit: async () => {
      const code = router.query.code as string;
      if (source === 'login') {
        return api.user_githubLogin(code);
      } else {
        return api.user_githubRegister(code, getIsSubscribe());
      }
    },
  });

  const google = useAuthForm({
    redirectUrl,
    submit: async () => {
      const token = /access_token=([^&]+)/.exec(window.location.hash)?.[1];
      if (!token) {
        throw new Error('access_token missing');
      }
      if (source === 'login') {
        return api.user_googleLogin(token);
      } else {
        return api.user_googleRegister(token, getIsSubscribe());
      }
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

  const getRedirect = (auth: 'github' | 'google') => {
    const query = [`auth=${auth}`];
    if (subscribeNewsletter) {
      query.push(`subscribeNewsletter=1`);
    }

    return encodeURIComponent(window.origin + `/${source}?${query.join('&')}`);
  };
  const checkCanAuth = () => {
    if (!validate || isValid) {
      return false;
    }
    validate();
    return true;
  };

  return (
    <>
      <div className="text-xs my-4 uppercase text-center">lub</div>
      <div className="grid md:grid-cols-2 gap-8">
        <Button
          testId="social-github-btn"
          onClick={() => {
            if (checkCanAuth()) {
              return;
            }
            const params = [
              `client_id=${GITHUB_CLIENT_ID}`,
              `redirect_uri=${getRedirect('github')}`,
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
            if (checkCanAuth()) {
              return;
            }
            const params = [
              `client_id=${GOOGLE_CLIENT_ID}`,
              `redirect_uri=${getRedirect('google')}`,
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
