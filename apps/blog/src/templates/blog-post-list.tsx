import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ArticlePreview } from '../components/ArticlePreview';
import { Post } from '../types';
import { MainToColGrid } from '../components/MainToColGrid';
import { Pagination } from '../components/Pagination';

interface BlogIndexProps {
  data: any;
  location: any;
  pathContext: {
    numPages: number;
    currentPage: number;
  };
}

const BlogIndex = (props: BlogIndexProps) => {
  const {
    data,
    location,
    pathContext: { numPages, currentPage },
  } = props;
  const posts: Post[] = data.allMdx.edges.map((x: any) => x.node);

  return (
    <Layout location={location}>
      <SEO title="Wszystkie posty" />
      <MainToColGrid>
        {posts.map(post => {
          return (
            <ArticlePreview key={post.fields.url} post={post}></ArticlePreview>
          );
        })}
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          getUrl={page => (page === 1 ? '/' : '/strona/' + page)}
        />
      </MainToColGrid>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
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
