import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ArticlePreview } from '../components/ArticlePreview';
import { Post } from '../types';
import { MainToColGrid } from '../components/MainToColGrid';
import { Pagination } from '../components/Pagination';
import styled from 'styled-components';
import { Theme } from '../Theme';

interface BlogIndexProps {
  data: any;
  location: any;
  pathContext: {
    numPages: number;
    currentPage: number;
    category: string;
    categorySlug: string;
  };
}

const Title = styled.h2`
  margin: 0;
  margin-top: -50px;
  margin-bottom: 30px;
  span {
    color: ${Theme.primary};
  }
`;

const BlogIndex = (props: BlogIndexProps) => {
  const {
    data,
    location,
    pathContext: { numPages, currentPage, category, categorySlug },
  } = props;
  const posts: Post[] = data.allMdx.edges.map((x: any) => x.node);
  const baseUrl = '/kategoria/' + categorySlug;
  return (
    <Layout location={location}>
      <SEO title={category} />
      <MainToColGrid>
        <Title>
          Kategoria: <span>{category}</span>
        </Title>
        {posts.map(post => {
          return (
            <ArticlePreview key={post.fields.url} post={post}></ArticlePreview>
          );
        })}
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          getUrl={page => (page === 1 ? baseUrl : baseUrl + '/' + page)}
        />
      </MainToColGrid>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($categorySlug: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { categorySlug: { eq: $categorySlug } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            url
            categorySlug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
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
    }
  }
`;
