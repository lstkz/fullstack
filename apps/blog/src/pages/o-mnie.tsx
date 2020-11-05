import React from 'react';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MainToColGrid } from '../components/MainToColGrid';
import styled from 'styled-components';
import { Title } from '../components/Title';
import { graphql, useStaticQuery } from 'gatsby';
import { socialLinks } from '../const';
import { List, ListItem } from '../components/List';

interface NotFoundPageProps {
  location: any;
}

const Content = styled.div`
  font-size: 16px;
`;

export const SubTitle = styled.h3`
  font-weight: bold;
  font-size: 28px;
  margin: 0;
  line-height: 1.1;
  margin-bottom: 20px;
  margin-top: 35px;
`;

const P = styled.p`
  margin: 5px 0;
`;

const ImgWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
  img {
    max-width: 100%;
  }
`;

const AboutMe = ({ location }: NotFoundPageProps) => {
  const data = useStaticQuery(graphql`
    query AboutMe {
      tco: file(absolutePath: { regex: "/tco.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1120, quality: 95) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
      me: file(absolutePath: { regex: "/me_big.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1120, quality: 95) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `);
  const tcoCover = data?.tco?.childImageSharp?.fluid;
  const meCover = data?.me?.childImageSharp?.fluid;

  return (
    <Layout location={location}>
      <SEO title="O mnie" />
      <MainToColGrid white>
        <Title>O mnie</Title>
        <Content>
          <P>
            Nazywam się Łukasz Sentkiewicz. Jestem programistą z ponad 10-letnim
            doświadczeniem. W latach 2013-2018 wygrałem ponad $1,000,000 na
            TopCoder.com, gdzie robiłem sporo projektów dla takich firm jak
            NASA, DARPA, EPA, Comcast, TopCoder, IBM. Jestem fullstack
            developerem i obecnie specjalizuję się w stacku: Typescript,
            Node.JS, AWS.
          </P>
          <SubTitle>Moje osiągniecia</SubTitle>
          Przez długi czas byłem numerem 1 💪 w kategorii Development na
          TopCoderze.
          <ImgWrapper>
            <Image fluid={tcoCover} alt="tco winnings" />
          </ImgWrapper>
          Największe osiągniecia na TopCoderze:
          <List>
            <ListItem>
              <a
                target="_blank"
                href="https://tco16.topcoder.com/tracks/development"
              >
                2014 TopCoder Open Development Champion.
              </a>
            </ListItem>
            <ListItem>
              <a
                target="_blank"
                href="https://tco15.topcoder.com/tracks/development"
              >
                2015 TopCoder Open Development Champion.
              </a>
            </ListItem>
            <ListItem>
              <a
                target="_blank"
                href="https://tco14.topcoder.com/tracks/development"
              >
                2016 TopCoder Open Development Champion.
              </a>
            </ListItem>
            <ListItem>12 Digital Run wins (monthly race).</ListItem>
            <ListItem>Red rating.</ListItem>
            <ListItem>350+ wygranych contestów.</ListItem>
          </List>
          <SubTitle>Czym się teraz zajmuję?</SubTitle>
          <ImgWrapper>
            <Image fluid={meCover} alt="Łukasz Sentkiewicz" />
          </ImgWrapper>
          <P>
            Na moim kanale na{' '}
            <a target="_blank" href={socialLinks.yt}>
              YouTubie
            </a>{' '}
            pokazuję programowanie na żywo aplikacji, które są bardziej
            rozbudowane. Obecnie jest przesyt materiałów dla ludzi
            początkujących i brakuje kontentu dla osób bardziej zaawansowanych.
            <br />
            Moim celem jest pokazywanie rzeczy, które są wymagane dla
            programistów chcących zarabiać topowe stawki (~15-20k PLN).
            <br />
            Jeżeli interesują Cię rzeczy bardziej rozbudowane niż statyczne
            strony HTML to zapraszam na mój kanał 😉.
          </P>
          <SubTitle>Wywiady</SubTitle>
          <List>
            <ListItem>
              <a
                target="_blank"
                href="https://www.topcoder.com/the-making-of-a-tco-development-champion-sky_-is-the-limit/"
              >
                The Making of a TCO Development Champion
              </a>
            </ListItem>
          </List>
          <SubTitle>Social Media</SubTitle>
          <List>
            <ListItem>
              <a target="_blank" href={socialLinks.tc}>
                TopCoder
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href={socialLinks.gh}>
                GitHub
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href={socialLinks.yt}>
                YouTube
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href={socialLinks.li}>
                LinkedIn
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href={socialLinks.twitter}>
                Twitter
              </a>
            </ListItem>
          </List>
        </Content>
      </MainToColGrid>
    </Layout>
  );
};

export default AboutMe;
