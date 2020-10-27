import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Post } from '../types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PokerRoomCommon from '../components/poker-room/PokerRoomCommon.mdx';
import { MainToColGrid } from '../components/MainToColGrid';
import styled from 'styled-components';
import { Theme } from '../Theme';
import * as DateFns from 'date-fns';
import locale from 'date-fns/locale/pl';
import { PostAuthor } from '../components/PostAuthor';
import { useBodyWidth } from '../helper';
import {
  CONTAINER_PADDING,
  MAX_SIZE,
  SIDEBAR_WIDTH,
  TABLE_THRESHOLD,
} from '../const';
import { Title } from '../components/Title';

const shortcodes = { Link, PokerRoomCommon }; // Provide common components here

const IframeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PostDate = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${Theme.textLight};
`;

const Sep = styled.div`
  margin: 35px 0;
  border-top: 1px solid rgba(124, 128, 146, 0.3);
`;

const NavLinks = styled.nav`
  margin-top: 40px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
  a {
    font-size: 18px;
  }
`;

interface BlogPostTemplateProps {
  data: any;
  pageContext: any;
  location: any;
}

const BlogPostTemplate = (props: BlogPostTemplateProps) => {
  const { data, pageContext, location } = props;

  const frontmatter: Post['frontmatter'] = data.mdx.frontmatter;
  const categorySlug = data.mdx.fields.categorySlug;
  const { previous, next } = pageContext;
  const ratio = 560 / 315;
  let bodyWidth = useBodyWidth();
  const iframeWidth = React.useMemo(() => {
    const containerWidth = Math.min(MAX_SIZE, bodyWidth);
    let target = containerWidth;
    if (bodyWidth >= TABLE_THRESHOLD) {
      target = containerWidth - SIDEBAR_WIDTH;
    }
    return target - 2 * CONTAINER_PADDING;
  }, [bodyWidth]);
  return (
    <Layout location={location}>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <MainToColGrid white>
        <Top>
          <Category to={'/kategoria/' + categorySlug}>
            {frontmatter.category.toUpperCase()}
          </Category>
          <PostDate>
            {DateFns.format(new Date(frontmatter.date), 'dd MMM YYY', {
              locale,
            })}
          </PostDate>
        </Top>
        <Title>{frontmatter.title}</Title>
        <IframeWrapper>
          <iframe
            width={iframeWidth}
            height={iframeWidth / ratio}
            src={`https://www.youtube.com/embed/${frontmatter.yt}`}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </IframeWrapper>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
        <NavLinks>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.url} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.url} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </NavLinks>
        <Sep />
        <PostAuthor />
      </MainToColGrid>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(slug: { eq: $slug }) {
      id
      body
      fields {
        categorySlug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        yt
        thumb {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
