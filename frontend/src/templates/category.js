import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlesCollection from "../components/collections/articles";
import FilterButton from "../components/filter";

const Category = ({ data }) => {
  const category = data.category.name;
  const seo = {
    metaTitle: category,
    metaDescription: `All ${category} articles`,
    color: data.strapiBlogpage.seo.color,
  };

  return (
    <Layout seo={seo}>
      <header className="ca-header">
        <div className="ca-header-content -sm">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">{category} Posts</h1>
          </div>
        </div>
      </header>

      <FilterButton />

      <section className="ca-section">
        <div className="ca-section-content e-noc e-hom">
          <div className="ca-section-container e-con">
            <ArticlesCollection
              huge={category}
              articles={data.allStrapiArticle.nodes}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Category;

export const query = graphql`
  query Category($slug: String!) {
    allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { status: { eq: "published" }, category: { slug: { eq: $slug } } }
    ) {
      nodes {
        id
        title
        publishedAt
        slug
        author {
          name
          slug
        }
        category {
          name
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1200, maxHeight: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    category: strapiCategory(slug: { eq: $slug }) {
      name
    }
    strapiBlogpage {
      seo {
        color {
          accent
        }
      }
    }
  }
`;
