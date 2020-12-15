import React from "react";
import gsap from "gsap";

import ToastContext from "../context/ToastContext";

const Toast = () => {
  const { message } = React.useContext(ToastContext);

  const [tlForward] = React.useState(
    new gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
  );

  const [tlReverse] = React.useState(
    new gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } })
  );

  React.useEffect(() => {
    tlForward
      .set(toastRef.current, {
        visibility: "visible",
      })
      .from(toastRef.current, {
        xPercent: 100,
        duration: 1,
      })
      .to(
        toastRef.current,
        {
          opacity: 1,
          duration: 2,
        },
        0
      );

    tlReverse
      .to(toastRef.current, {
        xPercent: 100,
        duration: 1,
      })
      .to(
        toastRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        0
      )
      .set(toastRef.current, {
        visibility: "hidden",
      });
  }, []);

  React.useEffect(() => {
    let timeout;
    const isDisabled = window.sessionStorage.getItem("disableToast");

    if (isDisabled === "true") {
      return window.sessionStorage.setItem("disableToast", "false");
    }

    if (message) {
      tlForward.play(0);

      timeout = setTimeout(() => {
        tlReverse.play(0);
      }, 3000);
    }

    return () => {
      tlForward.kill();
      tlReverse.kill();
      clearTimeout(timeout);
    };
  }, [message]);

  const toastRef = React.useRef();

  return (
    <div className="ca-toast" ref={toastRef}>
      <span className="ca-toast-message">{message}</span>
    </div>
  );
};

export default Toast;
