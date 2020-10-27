import { FluidObject } from 'gatsby-image';

export interface Post {
  fields: {
    url: string;
    categorySlug: string;
  };
  frontmatter: {
    title: string;
    category: string;
    date: string;
    description: string;
    yt: string;
    thumb: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}
