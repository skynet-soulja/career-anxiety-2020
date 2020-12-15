import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

import EventsCollection from "../components/collections/events";

import time from "../components/time";

const WorkshopPage = ({ data }) => {
  const upcoming = time.filterByTime(data.allStrapiWorkshop.nodes);
  const past = time.filterByTime(data.allStrapiWorkshop.nodes, false);

  return (
    <Layout seo={data.strapiWorkshoppage.seo}>
      <header className="ca-header">
        <div className="ca-header-content">
          <div className="ca-header-container e-con">
            <h1 className="ca-header-title">
              {data.strapiWorkshoppage.hero.title}
            </h1>
          </div>
        </div>
      </header>

      <section className="ca-section">
        <div className="ca-section-content">
          <div className="ca-section-container e-con">
            <div className="ca-split">
              <div className="ca-split-col -left">
                <h1 className="ca-split-title">Upcoming</h1>
              </div>
              <div className="ca-split-col -right">
                <EventsCollection type="workshop" events={upcoming} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ca-section">
        <div className="ca-section-content e-noc">
          <div className="ca-section-container e-con">
            <div className="ca-split">
              <div className="ca-split-col -left">
                <h1 className="ca-split-title">Past Events</h1>
              </div>
              <div className="ca-split-col -right">
                <EventsCollection type="workshop" events={past} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkshopPage;

export const query = graphql`
  {
    strapiWorkshoppage {
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
    allStrapiWorkshop(sort: { fields: date, order: DESC }) {
      nodes {
        id
        title
        description
        objectives
        audience
        date
        start
        end
        toRegisterURL
      }
    }
  }
`;
