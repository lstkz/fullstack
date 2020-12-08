import * as R from 'remeda';
import styled from 'styled-components';
import React from 'react';
import { GithubIcon } from 'src/icons/GithubIcon';
import { GoogleIcon } from 'src/icons/GoogleIcon';
import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from 'src/config';
import { spacerStyle } from 'src/components/_spacer';
import { Row, Col } from 'src/components/Grid';
import { Button } from 'src/components/Button';
import { useRouter } from 'next/dist/client/router';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { useErrorModalActions } from 'src/features/ErrorModalModule';

const Or = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  text-align: center;
  ${spacerStyle}
`;

interface SocialFormButtonsProps {
  source: 'login' | 'register';
}

export function SocialFormButtons(props: SocialFormButtonsProps) {
  const { source } = props;
  const router = useRouter();
  const errorModalActions = useErrorModalActions();

  const github = useAuthForm({
    submit: async () => {
      const fn =
        source === 'login' ? api.user_githubLogin : api.user_githubRegister;
      return fn.bind(api)(router.query.code as string);
    },
  });

  const google = useAuthForm({
    submit: async () => {
      const fn =
        source === 'login' ? api.user_googleLogin : api.user_googleRegister;
      const token = /access_token=([^&]+)/.exec(window.location.hash)![1];
      return fn.bind(api)(token);
    },
  });

  React.useEffect(() => {
    if (router.query.auth === 'github' && router.query.code) {
      void github.onSubmit().then(() =>
        router.replace({
          pathname: router.pathname,
          query: R.omit(router.query, ['auth', 'code']),
        })
      );
    }
    if (router.query.auth === 'google') {
      void google.onSubmit().then(() =>
        router.replace({
          pathname: router.pathname,
          query: R.omit(router.query, ['auth']),
        })
      );
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
      <Or py={3}>lub</Or>
      <Row>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
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
        </Col>
      </Row>
    </>
  );
}
