import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Moment from "react-moment";

import gsap from "gsap";

import time from "./time";
import ModalContext from "../context/ModalContext";
import UnderlineLink from "./link/underline";

const Modal = () => {
  const { isActive, type, content, toggleActive } = React.useContext(
    ModalContext
  );

  const [tlForward] = React.useState(
    new gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } })
  );

  const [tlReverse] = React.useState(
    new gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } })
  );

  React.useEffect(() => {
    tlForward
      .set(modalRef.current, {
        display: "block",
      })
      .set(overlayFadeRef.current, {
        visibility: "visible",
      })
      .to(overlayFadeRef.current, {
        opacity: 0.7,
        duration: 3,
      })
      .fromTo(
        overlayTitleRef.current,
        {
          opacity: 0,
          x: "10vw",
        },
        {
          x: "-20vw",
          opacity: 0.6,
          duration: 4,
          ease: "power2.out",
        },
        0
      )
      .from(
        overlayTextRef.current,
        {
          xPercent: 100,
          duration: 1.4,
        },
        0
      )
      .to(
        overlayTextRef.current,
        {
          skewX: "9deg",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        overlayTextRef.current,
        {
          skewX: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        0.8
      )
      .from(
        overlayContentRef.current,
        {
          xPercent: 100,
          duration: 1.8,
        },
        0.2
      )
      .to(
        overlayContentRef.current,
        {
          skewX: "6deg",
          duration: 1.4,
          ease: "power2.inOut",
        },
        0.2
      )
      .to(
        overlayContentRef.current,
        {
          skewX: 0,
          duration: 1,
          ease: "power4.out",
        },
        1.2
      );

    tlReverse
      .to(overlayFadeRef.current, {
        opacity: 0,
        duration: 2,
      })
      .to(
        overlayContentRef.current,
        {
          xPercent: 100,
          duration: 2,
        },
        0
      )
      .to(
        overlayTextRef.current,
        {
          xPercent: 100,
          duration: 2,
        },
        0.2
      )
      .to(
        overlayTitleRef.current,
        {
          opacity: 0.2,
          x: "-5vw",
          duration: 2,
          ease: "power2.out",
        },
        0.2
      )
      .set(modalRef.current, {
        display: "none",
      })
      .set(overlayFadeRef.current, {
        visibility: "hidden",
      });
  }, []);

  React.useEffect(() => {
    const isDisabled = window.sessionStorage.getItem("disableModal");

    if (isDisabled === "true") {
      return window.sessionStorage.setItem("disableModal", "false");
    }

    if (isActive) {
      tlReverse.kill();

      tlForward.play(0);
    }

    if (!isActive) {
      tlForward.kill();

      tlReverse.play(0);
    }
  }, [isActive]);

  const modalRef = React.useRef();
  const overlayFadeRef = React.useRef();
  const overlayTextRef = React.useRef();
  const overlayTitleRef = React.useRef();
  const overlayContentRef = React.useRef();
  const modalFilterRef = React.useRef();
  const modalEventRef = React.useRef();

  const data = useStaticQuery(query);

  return (
    <div className={`ca-modal -${type}`} ref={modalRef}>
      <div className="ca-modal-overlay -fade" ref={overlayFadeRef}></div>

      <div className="ca-modal-overlay -text" ref={overlayTextRef}>
        <h1 className="ca-modal-overlay-title" ref={overlayTitleRef}>
          {type === "filter" && "Filter"} {type === "workshop" && "Workshop"}{" "}
          {type === "speaking" && "Speaking"}
        </h1>
      </div>

      <div className="ca-modal-overlay -content" ref={overlayContentRef}>
        <button
          className={`ca-modal-close -${type}`}
          onClick={() => (isActive ? toggleActive() : null)}
        >
          <div className="ca-modal-close-trace"></div>
          <div className="ca-modal-close-trace"></div>
        </button>
        <div className="ca-modal-container e-con">
          {type === "filter" && (
            <div className="ca-modal-filter" ref={modalFilterRef}>
              <div className="ca-modal-filter-wrap">
                <span className="ca-nav-small">Filter</span>

                <div className="ca-modal-filter-all">
                  <UnderlineLink to="/blog">All Posts</UnderlineLink>
                </div>

                <h1 className="ca-modal-filter-title">By Category</h1>

                <div className="ca-modal-filter-group">
                  {data.allStrapiCategory.nodes.map((category) => (
                    <UnderlineLink
                      key={category.id}
                      to={`/blog/category/${category.slug}`}
                    >
                      {category.name}
                    </UnderlineLink>
                  ))}
                </div>

                <h1 className="ca-modal-filter-title">By Author</h1>

                <div className="ca-modal-filter-group">
                  {data.allStrapiWriter.nodes.map((author) => (
                    <UnderlineLink
                      key={author.id}
                      to={`/blog/author/${author.slug}`}
                    >
                      {author.name}
                    </UnderlineLink>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type !== "filter" && (
            <div className="ca-modal-event" ref={modalEventRef}>
              <div className="ca-modal-event-wrap">
                <h1 className="ca-modal-event-title">{content.title}</h1>

                <p className="ca-modal-event-time">
                  <Moment format="MMM DD, YYYY">{content.date}</Moment> |{" "}
                  {time.convertMilitary(content.start) +
                    " - " +
                    time.convertMilitary(content.end)}
                </p>

                <div className="ca-modal-event-main">
                  <div className="ca-modal-event-split">
                    <h1 className="ca-modal-event-l">
                      {type === "workshop" ? "Description" : "Venue"}
                    </h1>

                    <p className="ca-modal-event-r">
                      {type === "workshop"
                        ? content.description
                        : content.venue}
                    </p>
                  </div>

                  <div className="ca-modal-event-split">
                    <h1 className="ca-modal-event-l">
                      {type === "workshop" ? "Objectives" : "Location"}
                    </h1>

                    <p className="ca-modal-event-r">
                      {type === "workshop"
                        ? content.objectives
                        : content.location}
                    </p>
                  </div>

                  <div className="ca-modal-event-split">
                    <h1 className="ca-modal-event-l">
                      {type === "workshop" ? "Audience" : "Sponsor"}
                    </h1>

                    <p className="ca-modal-event-r">
                      {type === "workshop" ? content.audience : content.sponsor}
                    </p>
                  </div>
                </div>

                {type === "workshop" ? (
                  <a
                    href={content.toRegisterURL}
                    className="ca-link-underline"
                    target="_blank"
                  >
                    Register Here
                  </a>
                ) : (
                  <a
                    href={content.toEventURL}
                    className="ca-link-underline"
                    target="_blank"
                  >
                    Link To Event
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

const query = graphql`
  {
    allStrapiWriter {
      nodes {
        id
        slug
        name
      }
    }
    allStrapiCategory {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
