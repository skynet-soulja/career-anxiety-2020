import React from "react";
import Article from "../article";

import gsap from "gsap";

const Articles = ({ articles, huge, showCount = true }) => {
  const leftArticles = articles.filter((_, index) => index % 2 === 0);
  const rightArticles = articles.filter((_, index) => index % 2 !== 0);

  React.useEffect(() => {
    const tl = new gsap.timeline({
      defaults: {
        ease: "none",
      },
    });

    tl.to(hugeRef.current, {
      scrollTrigger: {
        trigger: hugeRef.current,
        start: "top 30%",
        end: "+=" + containerRef.current.getBoundingClientRect().height,
        scrub: true,
      },
      y:
        containerRef.current.getBoundingClientRect().height -
        hugeRef.current.getBoundingClientRect().height,
      duration: 1,
    })
      .from(
        leftRef.current,
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
          },
          opacity: 0,
          y: 300,
          duration: 2,
          ease: "expo.out",
        },
        0
      )
      .from(
        rightRef.current,
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
          },
          opacity: 0,
          y: 300,
          duration: 2,
          ease: "expo.out",
        },
        0.2
      )
      .to(
        leftRef.current.children,
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            scrub: 0.2,
            end: "+=" + containerRef.current.getBoundingClientRect().height,
          },
          y: "9vw",
          duration: 1,
          ease: "none",
        },
        0
      )
      .to(
        rightRef.current.children,
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            scrub: 0.2,
            end: "+=" + containerRef.current.getBoundingClientRect().height,
          },
          y: "-9vw",
          duration: 1,
          ease: "none",
        },
        0.2
      );

    return () => {
      tl.kill();
    };
  }, []);

  const hugeRef = React.useRef();
  const containerRef = React.useRef();
  const leftRef = React.useRef();
  const rightRef = React.useRef();

  return (
    <div className="ca-articles">
      {showCount && <h1 className="ca-count">Total: {articles.length}</h1>}
      {!articles.length && <h1 className="ca-articles-none">No Posts</h1>}

      <h1 className="ca-articles-huge" ref={hugeRef}>
        {huge}
      </h1>

      <div className="ca-articles-container" ref={containerRef}>
        <div className="ca-articles-split -left" ref={leftRef}>
          {leftArticles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>

        <div className="ca-articles-split -right" ref={rightRef}>
          {rightArticles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
