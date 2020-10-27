const path = require(`path`);
const slugify = require(`slugify`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 100000
        ) {
          nodes {
            slug
            frontmatter {
              title
              category
            }
            fields {
              url
              categorySlug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: post.fields.url,
      component: blogPost,
      context: {
        slug: post.slug,
        previous,
        next,
      },
    });
  });
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/strona/${i + 1}`,
      component: path.resolve('./src/templates/blog-post-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  const allCategories = posts.map(node => ({
    slug: node.fields.categorySlug,
    name: node.frontmatter.category,
  }));
  const count = {};
  allCategories.forEach(node => {
    if (count[node.slug]) {
      count[node.slug]++;
    } else {
      count[node.slug] = 1;
    }
  });

  const uniq = new Set();
  const categories = allCategories.filter(item => {
    if (uniq.has(item.slug)) {
      return false;
    }
    uniq.add(item.slug);
    return true;
  });
  categories.forEach(item => {
    const numPages = Math.ceil(count[item.slug] / postsPerPage);
    const baseUrl = '/kategoria/' + item.slug;
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? baseUrl : baseUrl + '/' + (i + 1),
        component: path.resolve('./src/templates/category.tsx'),
        context: {
          category: item.name,
          categorySlug: item.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    const { category } = node.frontmatter;
    createNodeField({
      name: `categorySlug`,
      node,
      value: category ? slugify(category).toLowerCase() : null,
    });
    createNodeField({
      name: `url`,
      node,
      value: slug.replace(/_/g, '/'),
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      category: String
      yt: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      categorySlug: String
    }
  `);
};
