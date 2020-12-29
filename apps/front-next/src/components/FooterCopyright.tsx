import Link from 'next/link';
import * as React from 'react';
import { MEDIA_MD, Theme } from 'src/Theme';
import styled from 'styled-components';
import { Divider } from './Divider';
import { Col, Row } from './Grid';

interface FooterCopyrightProps {
  className?: string;
}

const Links = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  list-style: none;
  margin: 0;
  justify-content: center;
  a {
    color: ${Theme.gray_500};
    display: block;
    padding: 0.25rem 1rem;
    &:hover {
      color: white;
    }
  }
  ${MEDIA_MD} {
    justify-content: flex-end;
  }
`;

const Left = styled(Col)`
  a {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const _FooterCopyright = (props: FooterCopyrightProps) => {
  const { className } = props;
  return (
    <div className="text-sm font-semibold text-center pb-6 md:text-left">
      <Divider />
      <div className="grid md:grid-cols-2">
        <div>
          © {new Date().getFullYear()}{' '}
          <Link href="/">
            <a>Fullstack</a>
          </Link>
          . Wszelkie prawa zastrzeżone.
        </div>
        <div>
          <Links>
            <li>
              <Link href="/privacy">Polityka Prywatności</Link>
            </li>
          </Links>
        </div>
      </div>
    </div>
  );
};

export const FooterCopyright = styled(_FooterCopyright)`
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  ${MEDIA_MD} {
    text-align: left;
  }
`;
