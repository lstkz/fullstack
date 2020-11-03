import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { SMALL_DESKTOP, socialLinks, TABLET } from '../const';
import { Theme } from '../Theme';
import { ArrowIcon } from './ArrowIcon';
import { Button } from './Button';
import { Container } from './Container';
import { GradientBg } from './GradientBg';
import { SocialButton } from './SocialButton';
import { FbIcon, YtIcon } from './SocialIcons';
import { TitleSep } from './TitleSep';

interface FooterProps {
  className?: string;
}

const Inner = styled.div`
  padding-top: 60px;
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: 45px;
  line-height: 65px;
  color: ${Theme.primary};
  margin: 0;
  margin-bottom: 30px;
`;

const Col = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 20px;

  &:nth-child(1) {
    width: 100%;
  }
  &:nth-child(2) {
    width: 100%;
  }
  &:nth-child(3) {
    max-width: 400px;
    margin-bottom: 30px;
  }

  ${TABLET} {
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 50%;
    }
  }

  ${SMALL_DESKTOP} {
    &:nth-child(2) {
      width: 25%;
    }
    &:nth-child(3) {
      width: 25%;
      max-width: auto;
      margin-bottom: 0;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  ${SocialButton} {
    margin: 0 5px;
  }
`;

const QuickLinksTitle = styled.h2`
  font-weight: bold;
  font-size: 29px;
  color: white;
  margin: 0;
`;

const Links = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    font-size: 18px;
    color: white;
    text-decoration: none;
  }

  li {
    margin-bottom: 10px;
  }

  li a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 15px;
  }
`;

const Sep = styled(TitleSep)`
  width: 20px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const IconWrapper = styled.div`
  width: 70px;
`;

const Buttons = styled.div`
  ${Button} {
    margin-top: 15px;
    svg {
      margin-right: 20px;
    }
    &:focus,
    &:hover {
      svg {
        path {
          fill: white;
        }
      }
    }
  }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px 0;
  text-align: center;
  color: white;
  margin-top: auto;
  margin-bottom: 0;
`;

const _Footer = (props: FooterProps) => {
  const { className } = props;
  return (
    <GradientBg className={className}>
      <Container>
        <Inner>
          <Col>
            <Title>Fullstack.pl</Title>
            <SocialIcons>
              <SocialButton big type="li" />
              <SocialButton big type="fb" />
              <SocialButton big type="yt" />
              <SocialButton big type="twitter" />
              <SocialButton big type="gh" />
            </SocialIcons>
          </Col>
          <Col>
            <QuickLinksTitle>Menu</QuickLinksTitle>
            <Sep />
            <Links>
              <li>
                <Link to="/">
                  <ArrowIcon />
                  Start
                </Link>
              </li>
              <li>
                <Link to="/o-mnie">
                  <ArrowIcon />O mnie
                </Link>
              </li>
              <li>
                <Link to="/kontakt">
                  <ArrowIcon />
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/privacy">
                  <ArrowIcon />
                  Polityka Prywatności
                </Link>
              </li>
            </Links>
          </Col>
          <Col>
            <Buttons>
              <Button
                block
                size="lg"
                type="solid"
                href={socialLinks.yt}
                hrefExternal
              >
                <IconWrapper>
                  <YtIcon scale={2} />
                </IconWrapper>
                Oglądaj mnie na YouTubie
              </Button>
              <Button
                block
                size="lg"
                type="solid"
                href={socialLinks.fb}
                hrefExternal
              >
                <IconWrapper>
                  <FbIcon scale={2} />
                </IconWrapper>
                Dołącz do grupy na facebooku
              </Button>
            </Buttons>
          </Col>
        </Inner>
      </Container>
      <Bottom>© 2020 Fullstack.pl</Bottom>
    </GradientBg>
  );
};

export const Footer = styled(_Footer)`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  margin-top: 60px;
  ${Container} {
    width: 100%;
  }
`;
