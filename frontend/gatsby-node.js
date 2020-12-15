exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              strapiId
              slug
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
              slug
            }
          }
        }
        authors: allStrapiWriter {
          edges {
            node {
              strapiId
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog articles pages.
  const articles = result.data.articles.edges;
  const categories = result.data.categories.edges;
  const authors = result.data.authors.edges;

  const ArticleTemplate = require.resolve("./src/templates/article.js");

  articles.forEach((article, index) => {
    actions.createPage({
      path: `/blog/${article.node.slug}`,
      component: ArticleTemplate,
      context: {
        slug: article.node.slug,
      },
    });
  });

  const CategoryTemplate = require.resolve("./src/templates/category.js");

  categories.forEach((category, index) => {
    actions.createPage({
      path: `/blog/category/${category.node.slug}`,
      component: CategoryTemplate,
      context: {
        slug: category.node.slug,
      },
    });
  });

  const AuthorTemplate = require.resolve("./src/templates/author.js");

  authors.forEach((author, index) => {
    actions.createPage({
      path: `/blog/author/${author.node.slug}`,
      component: AuthorTemplate,
      context: {
        slug: author.node.slug,
      },
    });
  });
};

module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const crypto = require(`crypto`);

  if (node.internal.type === "StrapiArticle") {
    const newNode = {
      id: createNodeId(`StrapiArticleContent-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
        content: node.content || " ",
        type: "StrapiArticleContent",
        mediaType: "text/markdown",
        contentDigest: crypto
          .createHash("md5")
          .update(node.content || " ")
          .digest("hex"),
      },
    };
    actions.createNode(newNode);
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    });
  }
};
