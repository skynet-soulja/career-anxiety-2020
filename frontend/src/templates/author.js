import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlesCollection from "../components/collections/articles";
import FilterButton from "../components/filter";

const Author = ({ data }) => {
  const writer = data.author.name;
  const seo = {
    metaTitle: writer,
    metaDescription: `All ${writer} articles`,
    color: data.strapiBlogpage.seo.color,
  };

  return (
    <Layout seo={seo}>
      <header className="ca-header">
        <div className="ca-header-content -sm">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">Posts by {writer}</h1>
          </div>
        </div>
      </header>

      <FilterButton />

      <section className="ca-section">
        <div className="ca-section-content e-hom e-noc">
          <div className="ca-section-container e-con">
            <ArticlesCollection
              huge="Author"
              articles={data.allStrapiArticle.nodes}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Author;

export const query = graphql`
  query Author($slug: String!) {
    allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { status: { eq: "published" }, author: { slug: { eq: $slug } } }
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
    author: strapiWriter(slug: { eq: $slug }) {
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
