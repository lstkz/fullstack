import styled from 'styled-components';
import React from 'react';
import { GithubIcon } from 'src/icons/GithubIcon';
import { GoogleIcon } from 'src/icons/GoogleIcon';
import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from 'src/config';
import { useActions } from 'typeless';
import { GlobalActions } from 'src/features/global/interface';
import { spacerStyle } from 'src/components/_spacer';
import { Row, Col } from 'src/components/Grid';
import { Button } from 'src/components/Button';

const Or = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  text-align: center;
  ${spacerStyle}
`;

function popupCenter(url: string, title: string, w: number, h: number) {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    'scrollbars=yes, width=' +
      w / systemZoom +
      ', height=' +
      h / systemZoom +
      ', top=' +
      top +
      ', left=' +
      left
  )!;

  // Puts focus on the newWindow
  if (newWindow?.focus) {
    newWindow.focus();
  }
}

export function SocialFormButtons() {
  const { githubCallback, googleCallback } = useActions(GlobalActions);
  React.useEffect(() => {
    (window as any).githubCallback = githubCallback;
    (window as any).googleCallback = googleCallback;
    return () => {
      delete (window as any).githubCallback;
      delete (window as any).googleCallback;
    };
  }, []);

  return (
    <>
      <Or py={3}>lub</Or>
      <Row>
        <Col sm={6}>
          <Button
            testId="social-github-btn"
            onClick={() => {
              const params = [
                `client_id=${GITHUB_CLIENT_ID}`,
                `redirect_uri=${encodeURIComponent(window.origin + '/github')}`,
                `scope=${encodeURIComponent('user:email')}`,
              ];
              popupCenter(
                `https://github.com/login/oauth/authorize?${params.join('&')}`,
                'github oauth',
                700,
                700
              );
            }}
            type="neutral"
            block
            icon={<GithubIcon size={20} />}
          >
            Github
          </Button>
        </Col>
        <Col sm={6}>
          <Button
            testId="social-google-btn"
            onClick={() => {
              const params = [
                `client_id=${GOOGLE_CLIENT_ID}`,
                `redirect_uri=${encodeURIComponent(window.origin + '/google')}`,
                `scope=email`,
                `response_type=token`,
              ];
              popupCenter(
                `https://accounts.google.com/o/oauth2/auth?${params.join('&')}`,
                'google oauth',
                700,
                700
              );
            }}
            type="neutral"
            block
            icon={<GoogleIcon size={20} />}
          >
            Google
          </Button>
        </Col>
      </Row>
    </>
  );
}
