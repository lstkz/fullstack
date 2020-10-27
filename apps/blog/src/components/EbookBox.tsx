import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Button } from './Button';
import { RightArrow } from './RightArrow';
import { SidebarBox } from './SidebarBox';

interface EbookBoxProps {
  className?: string;
}

const ImgWrapper = styled.div`
  margin: 30px 0 20px;
  text-align: center;
  img {
    border-radius: 6px;
  }
`;

const _EbookBox = (props: EbookBoxProps) => {
  const { className } = props;

  const data = useStaticQuery(graphql`
    query EbookCover {
      cover: file(absolutePath: { regex: "/ebook-cover.jpg/" }) {
        childImageSharp {
          fixed(width: 180, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const cover = data?.cover?.childImageSharp?.fixed;

  return (
    <SidebarBox title="Ściągnij darmowego e-booka" className={className}>
      5 unikatowych projektów dla junior developerów wraz z pełnym opisem
      funkcjonalności i mockupem.
      <ImgWrapper>
        <Image fixed={cover} alt="e-book" />
      </ImgWrapper>
      <Button>
        Pobierz <RightArrow />
      </Button>
    </SidebarBox>
  );
};

export const EbookBox = styled(_EbookBox)`
  display: block;
  ${Button} {
    margin: 0 auto;
    display: flex;
  }
`;
