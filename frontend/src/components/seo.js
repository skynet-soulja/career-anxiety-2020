import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ seo = {} }) => {
  const data = useStaticQuery(query);
  const {
    defaultSeo,
    siteName,
    favicon,
    fontColor,
    backgroundColor,
  } = data.strapiGlobal;

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo };

  // Set global background color css variable
  React.useEffect(() => {
    document.documentElement.style.setProperty("--color-fnt", fontColor);
    document.documentElement.style.setProperty("--color-bg", backgroundColor);
    document.documentElement.style.setProperty(
      "--color-acc",
      fullSeo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-about",
      data.strapiAboutpage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-blog",
      data.strapiBlogpage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-book",
      data.strapiBookpage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-contact",
      data.strapiContactpage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-home",
      data.strapiHomepage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-speaking",
      data.strapiSpeakingpage.seo.color.accent
    );
    document.documentElement.style.setProperty(
      "--color-workshop",
      data.strapiWorkshoppage.seo.color.accent
    );
  }, []);

  const getMetaTags = () => {
    console.log(`API_URL -> ${process.env.API_URL}`);
    console.log(`GATSBY_API_URL -> ${process.env.GATSBY_API_URL}`);
    console.log(`ROOT_URL -> ${process.env.ROOT_URL}`);
    console.log(`GATSBY_ROOT_URL -> ${process.env.GATSBY_ROOT_URL}`);
    const tags = [];

    if (fullSeo.metaTitle) {
      tags.push(
        {
          property: "og:title",
          content: fullSeo.metaTitle,
        },
        {
          name: "twitter:title",
          content: fullSeo.metaTitle,
        }
      );
    }
    if (fullSeo.metaDescription) {
      tags.push(
        {
          name: "description",
          content: fullSeo.metaDescription,
        },
        {
          property: "og:description",
          content: fullSeo.metaDescription,
        },
        {
          name: "twitter:description",
          content: fullSeo.metaDescription,
        }
      );
    }
    if (fullSeo.shareImage) {
      const imageUrl =
        (process.env.ROOT_URL || "http://localhost:8000") +
        fullSeo.shareImage.publicURL;
      tags.push(
        {
          name: "image",
          content: imageUrl,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          name: "twitter:image",
          content: imageUrl,
        }
      );
    }
    if (fullSeo.article) {
      tags.push({
        property: "og:type",
        content: "article",
      });
    }
    tags.push({ name: "twitter:card", content: "summary_large_image" });

    return tags;
  };

  const metaTags = getMetaTags();

  const capitalizedTitle = fullSeo.metaTitle
    .split(" ")
    .map((str) => str.replace(/^\w/, (c) => c.toUpperCase()))
    .join(" ");

  return (
    <Helmet
      title={capitalizedTitle}
      titleTemplate={`%s — ${siteName}`}
      link={[
        {
          rel: "icon",
          href: favicon.publicURL,
        },
      ]}
      script={[]}
      meta={metaTags}
    />
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};

const query = graphql`
  query {
    strapiGlobal {
      siteName
      favicon {
        publicURL
      }
      defaultSeo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
        color {
          accent
        }
      }
      fontColor
      backgroundColor
    }
    strapiBlogpage {
      seo {
        color {
          accent
        }
      }
    }
    strapiBookpage {
      seo {
        color {
          accent
        }
      }
    }
    strapiContactpage {
      seo {
        color {
          accent
        }
      }
    }
    strapiHomepage {
      seo {
        color {
          accent
        }
      }
    }
    strapiSpeakingpage {
      seo {
        color {
          accent
        }
      }
    }
    strapiWorkshoppage {
      seo {
        color {
          accent
        }
      }
    }
    strapiAboutpage {
      seo {
        color {
          accent
        }
      }
    }
  }
`;
