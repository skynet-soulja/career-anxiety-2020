import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import gsap from "gsap";

import Nav from "./nav";
import Seo from "./seo";
import Modal from "./modal";
import Toast from "./toast";
import Footer from "./footer";

const Layout = ({ children, seo }) => {
  const mainRef = React.useRef();

  React.useEffect(() => {
    const anim = gsap.to(mainRef.current, {
      opacity: 1,
      ease: "power2.out",
      duration: 1,
    });

    return () => {
      anim.kill();
    };
  });

  return (
    <>
      <Seo seo={seo} />

      <Nav />

      <Modal />

      <Toast />

      <main id="view-main" ref={mainRef}>
        <div
          onClick={() => {
            window.sessionStorage.setItem("scroll", "false");
          }}
        >
          <Link to="/" className="ca-nav-origin">
            Career Anxiety
          </Link>
        </div>

        {children}
        <Footer />
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
