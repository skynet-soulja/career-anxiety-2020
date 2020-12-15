import React from "react";
import { Link } from "gatsby";

import gsap from "gsap";

const Large = ({ children, to }) => {
  React.useEffect(() => {
    const scroll = gsap
      .timeline({
        defaults: {
          ease: "power4.out",
        },
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 95%",
        },
      })
      .from(
        textRef.current,
        {
          opacity: 0,
          skewY: "9deg",
          yPercent: 200,
          duration: 1.6,
        },
        0
      )
      .from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.6,
        },
        1
      );

    return () => {
      scroll.kill();
    };
  }, []);

  const textRef = React.useRef(null);
  const lineRef = React.useRef(null);

  return (
    <div
      className="ca-link-large-wrap"
      onClick={() => {
        window.sessionStorage.setItem("scroll", "false");
      }}
    >
      <Link className="ca-link-large" to={to}>
        <span ref={textRef}>{children}</span>

        <div ref={lineRef}></div>
      </Link>
    </div>
  );
};

export default Large;
