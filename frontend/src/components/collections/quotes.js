import React from "react";
import gsap from "gsap";

const Quotes = ({ quotes }) => {
  const [quote, setQuote] = React.useState(quotes[0]);

  React.useEffect(() => {
    const tl = new gsap.timeline({
      paused: true,
      defaults: { ease: "expo.out" },
    });

    tl.set(quoteRef.current, {
      skewY: "6deg",
      yPercent: 240,
    })
      .set(authorRef.current, {
        skewY: "6deg",
        yPercent: 240,
      })
      .to(
        quoteRef.current,
        {
          yPercent: 0,
          duration: 2,
        },
        0
      )
      .to(
        quoteRef.current,
        {
          skewY: 0,
          duration: 2.4,
        },
        0
      )
      .to(
        quoteRef.current,
        {
          yPercent: -240,
          duration: 3,
        },
        7.2
      )
      .to(
        quoteRef.current,
        {
          skewY: "6deg",
          duration: 3.4,
        },
        7.2
      )
      .to(
        authorRef.current,
        {
          yPercent: 0,
          duration: 2,
        },
        0
      )
      .to(
        authorRef.current,
        {
          skewY: 0,
          duration: 2.4,
        },
        0
      )
      .to(
        authorRef.current,
        {
          yPercent: -260,
          duration: 3,
        },
        7.2
      )
      .to(
        authorRef.current,
        {
          skewY: "6deg",
          duration: 3.4,
        },
        7.2
      );

    tl.play(0);

    const currentIndex = quotes.indexOf(quote);
    const nextIndex = currentIndex < quotes.length - 1 ? currentIndex + 1 : 0;

    const timeout = setTimeout(() => {
      setQuote(quotes[nextIndex]);
    }, 8000);

    return () => {
      tl.kill();
      clearTimeout(timeout);
    };
  }, [quote]);

  const quoteRef = React.useRef();
  const authorRef = React.useRef();

  return (
    <div className="ca-quote">
      <div className="ca-quote-content">
        <div className="ca-quote-wrap">
          <span className="ca-quotation">"</span>
        </div>

        <p className="ca-quote-text">
          <span className="e-db e-h" ref={quoteRef}>
            {quote.content}
          </span>
        </p>

        <div className="ca-quote-wrap -end">
          <span className="ca-quotation">"</span>
        </div>
      </div>

      <div className="ca-quote-author-wrap">
        <p className="ca-quote-author">
          —{" "}
          <span className="e-dib" ref={authorRef}>
            {quote.author}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Quotes;
