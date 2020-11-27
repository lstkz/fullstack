import * as React from 'react';
import styled from 'styled-components';
import { Theme } from 'src/Theme';
import { createUrl } from 'src/common/url';
import { Link } from './Link';
import { Container } from './Container';

interface FooterProps {
  className?: string;
}

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    margin: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BottomSep = styled.div`
  border: 1px solid ${Theme.gray2};
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Bottom = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const _Footer = (props: FooterProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Links>
          <Link
            href={createUrl({
              name: 'courses',
            })}
          >
            Courses
          </Link>
          {' | '}
          <Link
            href={createUrl({
              name: 'contact-us',
            })}
          >
            Contact us
          </Link>
          {' | '}
          <Link
            href={createUrl({
              name: 'tos',
            })}
          >
            Terms
          </Link>
          {' | '}
          <Link
            href={createUrl({
              name: 'privacy',
            })}
          >
            Privacy Policy
          </Link>
        </Links>
        <BottomSep />
        <Bottom>
          © {new Date().getFullYear()} Fullstack.pl All Rights Reserved
        </Bottom>
      </Container>
    </div>
  );
};

export const Footer = styled(_Footer)`
  display: block;
  padding: 30px 0;
  margin-top: 30px;
  background: ${Theme.text};
  color: ${Theme.grayLight};
  a {
    color: ${Theme.grayLight};
  }
`;
