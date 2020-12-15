import React from "react";
import Img from "gatsby-image";
import Markdown from "react-markdown";

import gsap from "gsap";
import UnderlineLink from "../link/underline";

const Writers = ({ writers }) => {
  const [writer, setWriter] = React.useState(
    writers[Math.floor(Math.random() * Math.floor(writers.length))]
  );
  const [index, setIndex] = React.useState(null);

  React.useEffect(() => {
    gsap.set(overlayRef.current, {
      xPercent: 100,
    });
  });

  React.useEffect(() => {
    if (index === null) {
      return;
    }
    const tl = new gsap.timeline({
      paused: true,
      defaults: { ease: "expo.out" },
    });

    tl.to(
      headshotRef.current,
      {
        xPercent: -40,
        opacity: 0,
        duration: 0.7,
      },
      0
    )
      .set(headshotRef.current, {
        xPercent: 40,
      })
      .to(
        headshotRef.current,
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
        },
        0.7
      )
      .to(
        infoRef.current,
        {
          opacity: 0,
          duration: 0.7,
        },
        0
      )
      .to(
        infoRef.current,
        {
          opacity: 1,
          duration: 3,
        },
        0.7
      )
      .fromTo(
        overlayRef.current,
        { xPercent: 100 },
        {
          xPercent: -100,
          duration: 3,
        },
        0
      )
      .fromTo(
        overlayRef.current,
        {
          skewX: "7deg",
        },
        {
          skewX: 0,
          duration: 3,
          ease: "expo.out",
        },
        0
      );

    setTimeout(() => {
      setWriter(writers[index]);
    }, 700);

    tl.play(0);

    return () => {
      tl.kill();
    };
  }, [index]);

  const overlayRef = React.useRef();
  const headshotRef = React.useRef();
  const infoRef = React.useRef();

  return (
    <div className="ca-writers">
      <div className="ca-writer">
        <div className="ca-writer-headshot">
          <button
            className="ca-writers-button -prev ca-link-underline"
            onClick={() => {
              const currentIndex = writers.indexOf(writer);
              const prevIndex =
                currentIndex === 0 ? writers.length - 1 : currentIndex - 1;
              setIndex(prevIndex);
            }}
          >
            Prev
          </button>
          <button
            className="ca-writers-button -next ca-link-underline"
            onClick={() => {
              const currentIndex = writers.indexOf(writer);
              const nextIndex =
                currentIndex < writers.length - 1 ? currentIndex + 1 : 0;

              setIndex(nextIndex);
            }}
          >
            Next
          </button>

          <div className="ca-writer-headshot-wrap">
            <div className="ca-writer-overlay" ref={overlayRef}></div>
            <div ref={headshotRef}>
              <Img
                alt={writer.name}
                fluid={writer.headshot.childImageSharp.fluid}
              />
            </div>
          </div>
        </div>

        <div className="ca-writer-info" ref={infoRef}>
          <h1 className="ca-writer-name">{writer.name}</h1>

          <div className="ca-markdown-wrap">
            <Markdown source={writer.biography} />
          </div>

          <div className="ca-writer-social">
            {writer.social.map((social) => (
              <a
                key={social.id}
                href={social.platformURL}
                className="ca-link-underline"
                target="_blank"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writers;
