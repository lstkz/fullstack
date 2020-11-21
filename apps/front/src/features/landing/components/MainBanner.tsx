import * as React from 'react';
import { Container } from 'src/components/Container';
import { Col, Row } from 'src/new-components/Grid';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface MainBannerProps {
  className?: string;
}

const Left = styled(Col)`
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Right = styled(Col)`
  position: relative;
`;

const TopText = styled.h6`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 1rem;
`;

const Slogan = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
`;

const SloganDiff = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${NewTheme.primary};
`;

const Desc = styled.div`
  opacity: 0.8;
  font-size: 1.125rem;
  font-weight: 300;
  margin-top: 1.5rem;
`;

const MainImage = styled.div`
  max-width: 100%;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 500px;
  background: #eee;
  margin-top: 1.5rem;
  left: 7.5rem;
  position: relative;
  overflow: hidden;

  @media (min-width: 1350px) {
    width: 120%;
  }

  ${MEDIA_MD} {
  }
`;

const SecondaryImage = styled.div`
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 420px;
  width: 240px;
  background: ${NewTheme.primary};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  ${MEDIA_MD} {
    left: -3rem;
  }
`;

const _MainBanner = (props: MainBannerProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Row>
          <Left md={6} pr={5}>
            <TopText>- Ucz się od najlepszych</TopText>
            <Slogan>
              Najlepszy sposób na
              <SloganDiff>naukę programowania.</SloganDiff>
            </Slogan>
            <Desc>
              Nowoczesny kurs TypeScripta i podstaw algorytmiki.
              <br />
              Ponad 300 godzin praktyki.
              <br />
              Jest to pierwszy krok do zostania fullstakiem.
            </Desc>
          </Left>
          <Right md={6}>
            <SecondaryImage />
            <MainImage />
          </Right>
        </Row>
      </Container>
      <SectionShape position="bottom" color="white" />
    </div>
  );
};

export const MainBanner = styled(_MainBanner)`
  position: relative;
  display: block;
  background: ${NewTheme.section_dark};
  color: white;
  overflow: hidden;
  ${Container} {
    display: flex;
    padding: 0.75rem 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
