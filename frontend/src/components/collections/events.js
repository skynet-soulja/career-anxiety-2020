import React from "react";
import Moment from "react-moment";

import gsap from "gsap";

import ModalContext from "../../context/ModalContext";

const Events = ({ type, events, showCount = true }) => {
  const { toggleActive, setContent } = React.useContext(ModalContext);

  React.useEffect(() => {
    const scroll = gsap.from(eventRef.current.children, {
      scrollTrigger: {
        trigger: eventRef.current,
        start: "top 85%",
      },
      ease: "expo.out",
      opacity: 0,
      yPercent: 200,
      duration: 2.4,
      stagger: 0.3,
    });

    return () => {
      scroll.kill();
    };
  }, []);

  const eventRef = React.useRef();

  return (
    <div className="ca-events">
      <div className="ca-events-container">
        {showCount && <h1 className="ca-count">Total: {events.length}</h1>}
        <div ref={eventRef}>
          {events.map((event) => (
            <div
              key={event.id}
              className={`ca-event -${type}`}
              onClick={() => {
                toggleActive();
                setContent([type, event]);
              }}
            >
              <div className="ca-event-content">
                <div className="ca-event-container">
                  <h1 className="ca-event-title">{event.title}</h1>

                  <button className="ca-event-button">
                    <div className={`ca-event-open -${type}`}>
                      <div className="ca-event-open-trace"></div>
                      <div className="ca-event-open-trace"></div>
                    </div>

                    <Moment className="ca-event-date" format="MM-DD-YYYY">
                      {event.date}
                    </Moment>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!events.length && (
            <div className={`ca-event -${type} -none`}>
              <div className="ca-event-content">
                <div className="ca-event-container">
                  <h1 className="ca-event-title">
                    {type === "workshop" && "No Workshops"}
                    {type === "speaking" && "No Speaking Events"}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
