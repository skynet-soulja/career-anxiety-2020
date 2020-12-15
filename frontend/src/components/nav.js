import React from "react";
import gsap from "gsap";

import NavLinksCollection from "./collections/navlinks";

const Nav = () => {
  const [isActive, setIsActive] = React.useState(null);
  const [navBoxBackground, setNavBoxBackground] = React.useState("#fff");

  const tlForward = React.useMemo(
    () => gsap.timeline({ paused: true, defaults: { ease: "expo.out" } }),
    []
  );

  const tlReverse = React.useMemo(
    () =>
      gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1 },
      }),
    []
  );

  React.useEffect(() => {
    tlForward
      .set(navContentRef.current, {
        display: "block",
      })
      .to(
        buttonLineRef.current,
        {
          xPercent: -110,
          backgroundColor: "#DB5461",
          duration: 1,
        },
        0
      )
      .to(
        buttonMenuRef.current,
        {
          xPercent: -105,
          duration: 1,
        },
        0
      )
      .to(
        buttonCloseRef.current,
        {
          xPercent: -105,
          duration: 1,
        },
        0.2
      )
      .to(
        navBoxRef.current,
        {
          xPercent: -100,
          duration: 1,
        },
        0
      )
      .to(
        navBoxRef.current,
        {
          skewX: "9deg",
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        navBoxRef.current,
        {
          skewX: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0.1
      )
      .to(
        navBackdropRef.current,
        {
          opacity: 0.7,
          duration: 1,
        },
        0
      )
      .to(
        navMainRef.current,
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0
      );

    tlReverse
      .to(navBoxRef.current, {
        xPercent: 100,
        duration: 1.6,
      })
      .to(
        buttonLineRef.current,
        {
          xPercent: 0,
          backgroundColor: "var(--color-acc)",
        },
        0
      )
      .to(
        buttonMenuRef.current,
        {
          xPercent: 0,
          opacity: 1,
        },
        0
      )
      .to(
        buttonCloseRef.current,
        {
          xPercent: 100,
        },
        0
      )
      .to(
        navBackdropRef.current,
        {
          opacity: 0,
          duration: 0.6,
        },
        0
      )
      .to(
        navMainRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        0
      )
      .set(
        navContentRef.current,
        {
          display: "none",
        },
        0.4
      );

    return () => {
      tlForward.kill();
      tlReverse.kill();
    };
  }, []);

  React.useEffect(() => {
    if (isActive === true) {
      tlReverse.kill();
      tlForward.play(0);
    }

    if (isActive === false) {
      tlForward.kill();
      tlReverse.play(0);
    }
  }, [isActive]);

  const navContentRef = React.useRef();
  const navBoxRef = React.useRef();
  const navMainRef = React.useRef();
  const navBackdropRef = React.useRef();
  const buttonLineRef = React.useRef();
  const buttonMenuRef = React.useRef();
  const buttonCloseRef = React.useRef();

  return (
    <nav className="ca-nav">
      <div className="ca-nav-toggle -extend-magnet" data-magnetic>
        <button
          id="toggle-stick"
          className="ca-nav-button"
          onClick={() => setIsActive(!isActive)}
        >
          <span ref={buttonLineRef} className="ca-nav-button-line"></span>

          <div className="ca-nav-button-text">
            <span ref={buttonMenuRef} className="ca-nav-button-menu">
              menu
            </span>

            <span ref={buttonCloseRef} className="ca-nav-button-close">
              close
            </span>
          </div>
        </button>
      </div>

      <div ref={navContentRef} className="ca-nav-content">
        <div
          ref={navBackdropRef}
          className="ca-nav-backdrop"
          onClick={() => (isActive ? setIsActive(false) : null)}
        ></div>

        <div
          ref={navBoxRef}
          className="ca-nav-box"
          style={{ backgroundColor: navBoxBackground }}
        >
          <div
            className="ca-nav-main"
            onMouseLeave={() => {
              setNavBoxBackground("#fff");
            }}
            ref={navMainRef}
          >
            <span className="ca-nav-small">Navigation</span>

            <NavLinksCollection setNavBoxBackground={setNavBoxBackground} />

            <div className="ca-nav-bottom-content">
              <div className="ca-nav-bottom-flex">
                <span className="ca-nav-small -cnbf">The Book</span>
                <a className="ca-link-underline" href="#" target="_blank">
                  Purchase Here
                </a>
              </div>

              <div className="ca-nav-bottom-flex">
                <span className="ca-nav-small -cnbf">Support</span>
                <a
                  className="ca-link-underline"
                  href="mailto:support@career-anxiety"
                >
                  support@career-anxiety
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
