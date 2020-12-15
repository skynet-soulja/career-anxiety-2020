import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";

import NavLink from "../link/nav";

const NavLinks = ({ setNavBoxBackground }) => {
  const { pathname } = useLocation();
  const data = useStaticQuery(query);

  return (
    <>
      <NavLink
        to="/"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiHomepage.seo.color.accent}
      >
        Home
      </NavLink>

      <NavLink
        to="/book"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiBookpage.seo.color.accent}
      >
        Book
      </NavLink>

      <NavLink
        to="/workshop"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiWorkshoppage.seo.color.accent}
      >
        Workshops\Services
      </NavLink>

      <NavLink
        to="/speaking"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiSpeakingpage.seo.color.accent}
      >
        Speaking Events
      </NavLink>

      <NavLink
        to="/blog"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiBlogpage.seo.color.accent}
      >
        Blog
      </NavLink>

      <NavLink
        to="/about"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiAboutpage.seo.color.accent}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        setNavBoxBackground={setNavBoxBackground}
        pathname={pathname}
        color={data.strapiContactpage.seo.color.accent}
      >
        Contact
      </NavLink>
    </>
  );
};

export default NavLinks;

const query = graphql`
  query {
    strapiHomepage {
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
  }
`;
