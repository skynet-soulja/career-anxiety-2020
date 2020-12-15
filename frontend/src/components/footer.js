import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import gsap from "gsap";

import LargeLink from "./link/large";

const Footer = () => {
  // React.useEffect(() => {
  //   const anim = gsap.from(footerRef.current, {
  //     scrollTrigger: {
  //       trigger: footerRef.current,
  //       start: "top bottom",
  //       end: "top 20%",
  //       scrub: true,
  //     },
  //     yPercent: -40,
  //     duration: 1,
  //     ease: "none",
  //   });

  //   return () => {
  //     anim.kill();
  //   };
  // });

  const data = useStaticQuery(query);

  const footerRef = React.useRef(null);

  return (
    <footer className="ca-footer" ref={footerRef}>
      <div className="ca-footer-content">
        <div className="ca-footer-container e-con">
          <div className="ca-footer-body">
            <h1 className="ca-footer-title">Questions?</h1>

            <LargeLink to="/contact">Contact Us</LargeLink>
          </div>

          <div className="ca-footer-bottom">
            <div className="ca-footer-bottom-group">
              <span className="ca-footer-small">Career Anxiety 2020</span>

              <div>
                Made With{" "}
                <a
                  className="ca-link-underline"
                  href="https://strapi.io"
                  target="_blank"
                >
                  Strapi
                </a>
              </div>
            </div>

            <div className="ca-footer-bottom-group">
              <span className="ca-footer-small">Support</span>

              <div>
                <a
                  className="ca-link-underline"
                  href="mailto:support@career-anxiety.com"
                >
                  support@career-anxiety.com
                </a>
              </div>
            </div>

            <div className="ca-footer-bottom-group">
              <span className="ca-footer-small">Book</span>

              <div>
                <a
                  className="ca-link-underline"
                  href={data.strapiBookpage.toOrderURL}
                  target="_blank"
                >
                  Purchase Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const query = graphql`
  {
    strapiBookpage {
      toOrderURL
    }
  }
`;
