import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ArticlesCollection from "../components/collections/articles";
import FilterButton from "../components/filter";

const BlogPage = ({ data }) => {
  return (
    <Layout seo={data.strapiBlogpage.seo}>
      <header className="ca-header">
        <div className="ca-header-content -sm">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">
              {data.strapiBlogpage.hero.title}
            </h1>
          </div>
        </div>
      </header>

      <FilterButton />

      <section className="ca-section">
        <div className="ca-section-content e-hom e-noc">
          <div className="ca-section-container e-con">
            <ArticlesCollection
              huge="All"
              articles={data.allStrapiArticle.nodes}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  {
    strapiBlogpage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
        color {
          accent
        }
      }
    }
    allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { status: { eq: "published" } }
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
            fluid(maxWidth: 564, maxHeight: 850) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
