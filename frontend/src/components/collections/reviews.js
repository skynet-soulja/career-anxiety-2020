import React from "react";
import gsap from "gsap";

const Reviews = ({ reviews }) => {
  const [review, setReview] = React.useState(reviews[0]);

  React.useEffect(() => {
    const tl = new gsap.timeline({
      paused: true,
      defaults: { ease: "expo.out" },
    });

    tl.set(reviewRef.current, {
      xPercent: 110,
      opacity: 0,
    })
      .set(indexRef.current, {
        yPercent: 110,
        opacity: 0,
      })
      .to(reviewRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 2.2,
      })
      .to(
        indexRef.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
        },
        0
      )
      .to(
        indexRef.current,
        {
          yPercent: -110,
          opacity: 0,
          duration: 2,
        },
        4.4
      );

    tl.play(0);

    const currentIndex = reviews.indexOf(review);
    const nextIndex = currentIndex < reviews.length - 1 ? currentIndex + 1 : 0;

    const timeout = setTimeout(() => {
      setReview(reviews[nextIndex]);
    }, 5000);

    return () => {
      tl.kill();
      clearTimeout(timeout);
    };
  }, [review]);

  const reviewRef = React.useRef();
  const indexRef = React.useRef();

  return (
    <div className="ca-reviews">
      <div className="ca-reviews-content">
        <div className="ca-reviews-container">
          <div className="ca-review">
            <div className="ca-review-content">
              <div className="ca-review-container">
                <span className="ca-review-index">
                  0
                  <span ref={indexRef} className="e-dib">
                    {reviews.indexOf(review)}
                  </span>
                </span>

                <div className="ca-review-block">
                  <div ref={reviewRef} className="ca-review-main">
                    <p className="ca-review-author">
                      — <span className="e-dib">{review.author}</span>
                    </p>

                    <p className="ca-review-content">{review.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
