import * as React from 'react';
import { Container } from 'src/components/Container';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface MainBannerProps {
  className?: string;
}

const Left = styled.div`
  width: 50%;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Right = styled.div`
  width: 50%;
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
  width: 100%;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 500px;
  background: #eee;
  margin-top: 1.5rem;

  @media (min-width: 1350px) {
    width: 120%;
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
  left: -3rem;
`;

const _MainBanner = (props: MainBannerProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Left>
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
        <Right>
          <SecondaryImage />
          <MainImage />
        </Right>
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
  ${Container} {
    display: flex;
    padding: 0.75rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
