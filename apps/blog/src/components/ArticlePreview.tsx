import * as React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Post } from '../types';
import { Box } from './Box';
import { Theme } from '../Theme';
import { Button } from './Button';
import { RightArrow } from './RightArrow';
import { Link } from 'gatsby';
import * as DateFns from 'date-fns';
import locale from 'date-fns/locale/pl';
import { TitleSep } from './TitleSep';
import { DESKTOP, SMALL_DESKTOP } from '../const';

interface ArticlePreviewProps {
  className?: string;
  post: Post;
}

const ImgWrapper = styled.div`
  background: #ccc;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  margin: 0 auto 10px;
  ${SMALL_DESKTOP} {
    margin-bottom: 0;
    max-width: 360px;
  }
  ${DESKTOP} {
    max-width: 460px;
  }
`;
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${SMALL_DESKTOP} {
    margin-left: 20px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 32px;
  margin: 0;
  line-height: 1.1;
  a {
    color: ${Theme.textDark};
    text-decoration: none;
  }
`;

const Category = styled(Link)`
  font-weight: 500;
  font-size: 17px;
  color: ${Theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Desc = styled.div`
  color: #7c8092;
  font-weight: 400;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Sep = styled(TitleSep)`
  width: 37px;
  height: 4px;
  background: ${Theme.primary};
  border-radius: 20px;
`;

const ReadMoreButton = styled(Button)`
  margin-top: 40px;
  margin-top: auto;
  margin-bottom: 0;
  flex-grow: 0;
  align-self: flex-start;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PostDate = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${Theme.textLight};
`;

const _ArticlePreview = (props: ArticlePreviewProps) => {
  const { className, post } = props;
  let featuredImgFluid = post.frontmatter.thumb?.childImageSharp?.fluid;
  const href = post.fields.url;
  return (
    <Box className={className}>
      <ImgWrapper>
        <Link to={href}>
          {featuredImgFluid && <Img fluid={featuredImgFluid} />}{' '}
        </Link>
      </ImgWrapper>
      <Content>
        <Top>
          <Category to={'/kategoria/' + post.fields.categorySlug}>
            {post.frontmatter.category?.toUpperCase()}
          </Category>
          <PostDate>
            {DateFns.format(new Date(post.frontmatter.date), 'dd MMM YYY', {
              locale,
            })}
          </PostDate>
        </Top>
        <Title>
          <Link to={href}>{post.frontmatter.title}</Link>
        </Title>
        <Sep />
        <Desc>{post.frontmatter.description}</Desc>
        <ReadMoreButton href={href}>
          Czytaj więcej <RightArrow />
        </ReadMoreButton>
      </Content>
    </Box>
  );
};

export const ArticlePreview = styled(_ArticlePreview)`
  flex-direction: column;
  display: flex;
  margin-bottom: 30px;

  ${SMALL_DESKTOP} {
    flex-direction: row;
  }
`;
