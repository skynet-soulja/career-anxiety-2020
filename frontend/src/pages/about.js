import React from "react";
import { graphql } from "gatsby";
import Markdown from "react-markdown";

import Layout from "../components/layout";
import WritersCollection from "../components/collections/writers";

const AboutPage = ({ data }) => {
  return (
    <Layout seo={data.strapiAboutpage.seo}>
      <header className="ca-about-header">
        <div className="ca-about-header-content">
          <div className="ca-about-header-container">
            <h1 className="ca-about-header-title">
              {data.strapiAboutpage.hero.title}
            </h1>
          </div>
        </div>
      </header>

      <section className="ca-about">
        <div className="ca-about-content">
          <div className="ca-about-container e-con">
            <WritersCollection writers={data.allStrapiWriter.nodes} />
          </div>
        </div>
      </section>

      <section className="ca-about-blurb">
        <div className="ca-about-blurb-content">
          <div className="ca-about-blurb-container">
            <div className="ca-about-blurb-split">
              <p className="ca-about-blurb-title">
                {data.strapiAboutpage.blurb.title}
              </p>

              <div className="ca-markdown-wrap">
                <Markdown
                  source={data.strapiAboutpage.blurb.content}
                  escapeHtml={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  {
    strapiAboutpage {
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
      blurb {
        title
        content
      }
    }
    allStrapiWriter {
      nodes {
        id
        name
        biography
        headshot {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        social {
          id
          platform
          platformURL
        }
      }
    }
  }
`;
