import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Markdown from "react-markdown";
import gsap from "gsap";

import Layout from "../components/layout";
import QuotesCollection from "../components/collections/quotes";
import ArticlesCollection from "../components/collections/articles";
import EventsCollection from "../components/collections/events";
import LargeLink from "../components/link/large";

import time from "../components/time";

const HomePage = ({ data }) => {
  const upcomingWorkshops = time.filterByTime(data.allStrapiWorkshop.nodes);
  const upcomingSpeakings = time.filterByTime(data.allStrapiSpeaking.nodes);

  React.useEffect(() => {
    const anim = new gsap.timeline({
      scrollTrigger: {
        trigger: blurbRef.current,
        start: "top center",
        end: "+=" + blurbWrapRef.current.getBoundingClientRect().height,
        scrub: true,
      },
    })
      .to(
        blurbRef.current,
        {
          y:
            blurbWrapRef.current.getBoundingClientRect().height -
            blurbRef.current.getBoundingClientRect().height,
          duration: 1,
          ease: "none",
        },
        0
      )
      .to(
        asideRef.current,
        {
          y:
            blurbWrapRef.current.getBoundingClientRect().height -
            blurbRef.current.getBoundingClientRect().height -
            400,
          duration: 1,
          ease: "none",
        },
        0
      );

    return () => {
      anim.kill();
    };
  });

  const blurbWrapRef = React.useRef(null);
  const blurbRef = React.useRef(null);
  const asideRef = React.useRef(null);

  return (
    <Layout seo={data.strapiHomepage.seo}>
      <header className="ca-home-tophead">
        <div className="ca-home-tophead-content">
          <h1 className="ca-home-tophead-text">
            {data.strapiHomepage.hero.title}
          </h1>

          <QuotesCollection quotes={data.allStrapiQuote.nodes} />
        </div>
      </header>

      <section className="ca-home-book">
        <div className="ca-home-book-content e-hom">
          <div className="ca-home-book-container e-con">
            <div className="ca-home-book-image">
              <span className="ca-home-book-image-aside" ref={asideRef}>
                {data.strapiBookpage.bookCover.alt}
              </span>

              <Img
                alt={data.strapiBookpage.bookCover.alt}
                fluid={data.strapiBookpage.bookCover.img.childImageSharp.fluid}
              />
            </div>

            <div className="ca-home-book-blurb-wrap" ref={blurbWrapRef}>
              <div className="ca-home-book-blurb" ref={blurbRef}>
                <Markdown
                  source={data.strapiBookpage.homepageBlurb}
                  escapeHtml={false}
                />
                <div
                  onClick={() => {
                    window.sessionStorage.setItem("scroll", "false");
                  }}
                >
                  <Link className="ca-link-inked -book" to="/book">
                    <span>About the Book</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ca-home-articles">
        <div className="ca-home-articles-content e-hom">
          <div className="ca-home-articles-container e-con">
            <h1 className="ca-home-section-title">Latest Posts</h1>

            <div className="ca-home-articles-main -e-bot">
              <ArticlesCollection
                showCount={false}
                articles={data.allStrapiArticle.nodes}
              />
            </div>

            <LargeLink to="/blog">All Posts</LargeLink>
          </div>
        </div>
      </section>

      <section className="ca-home-events">
        <div className="ca-home-events-content e-hom">
          <div className="ca-home-events-container e-con">
            <h1 className="ca-home-section-title">Upcoming Workshops</h1>

            <EventsCollection type="workshop" events={upcomingWorkshops} />

            <LargeLink to="/workshop">All Workshops</LargeLink>
          </div>
        </div>
      </section>

      <section className="ca-home-events">
        <div className="ca-home-events-content e-hom">
          <div className="ca-home-events-container e-con">
            <h1 className="ca-home-section-title">Upcoming Speaking Events</h1>

            <EventsCollection type="speaking" events={upcomingSpeakings} />

            <LargeLink to="/speaking">All Speaking Events</LargeLink>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  {
    strapiHomepage {
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
    strapiBookpage {
      homepageBlurb
      toOrderURL
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
    }
    allStrapiQuote {
      nodes {
        author
        content
      }
    }
    allStrapiArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: { status: { eq: "published" } }
      limit: 4
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
    allStrapiWorkshop(limit: 3, sort: { fields: date, order: DESC }) {
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
    allStrapiSpeaking(limit: 3, sort: { fields: date, order: DESC }) {
      nodes {
        id
        title
        venue
        location
        sponsor
        date
        start
        end
        toEventURL
      }
    }
  }
`;
