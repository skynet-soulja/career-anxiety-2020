import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Markdown from "react-markdown";

import Layout from "../components/layout";
import ReviewsCollection from "../components/collections/reviews";

const BookPage = ({ data }) => {
  return (
    <Layout seo={data.strapiBookpage.seo}>
      <header className="ca-header">
        <div className="ca-header-content">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">
              {data.strapiBookpage.hero.title}
            </h1>
          </div>
        </div>
      </header>

      <section className="ca-book">
        <div className="ca-book-content e-bot">
          <div className="ca-book-container e-con">
            <div className="ca-book-description-wrap">
              <Markdown
                source={data.strapiBookpage.fullDescription}
                escapeHtml={false}
              />

              <a
                href={data.strapiBookpage.toOrderURL}
                className="ca-link-inked"
                target="_blank"
              >
                <span>Purchase Here</span>
              </a>
            </div>

            <div className="ca-book-image">
              <Img
                alt={data.strapiBookpage.bookCover.alt}
                fluid={data.strapiBookpage.bookCover.img.childImageSharp.fluid}
              />
            </div>
          </div>
        </div>
      </section>

      {data.strapiBookpage.reviews.length && (
        <section className="ca-book-reviews">
          <div className="ca-book-reviews-content e-noc">
            <div className="ca-book-reviews-container e-con">
              <h1 className="ca-header-title">Reviews</h1>

              <ReviewsCollection reviews={data.strapiBookpage.reviews} />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BookPage;

export const query = graphql`
  {
    strapiBookpage {
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
      bookCover {
        alt
        img {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      reviews {
        id
        author
        content
      }
      fullDescription
      toOrderURL
    }
  }
`;
