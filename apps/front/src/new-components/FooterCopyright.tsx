import * as React from 'react';
import { Link } from 'src/new-components/Link';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
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
    color: ${NewTheme.gray_500};
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
    <div className={className}>
      <Divider />
      <Row>
        <Left md={6}>
          © {new Date().getFullYear()} <Link href="/">Fullstack</Link>. Wszelkie
          prawa zastrzeżone.
        </Left>
        <Col md={6}>
          <Links>
            <li>
              <Link href="/privacy">Polityka Prywatności</Link>
            </li>
          </Links>
        </Col>
      </Row>
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
