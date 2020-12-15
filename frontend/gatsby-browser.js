import "./src/assets/scss/main.scss";

import React from "react";
import { ModalProvider } from "./src/context/ModalContext";
import { ToastProvider } from "./src/context/ToastContext";

import gsap from "gsap";
import SmoothScrollbar from "smooth-scrollbar";
import ScrollTriggerPlugin from "./src/assets/vendor/ScrollTriggerPlugin";
import SoftScrollPlugin from "./src/assets/vendor/SoftScrollPlugin";

SmoothScrollbar.use(ScrollTriggerPlugin, SoftScrollPlugin);

export const onClientEntry = () => {
  window.sessionStorage.setItem("scroll", "false");
};

export const onPreRouteUpdate = () => {
  window.sessionStorage.setItem("disableModal", "true");
  window.sessionStorage.setItem("disableToast", "true");
};

export const onRouteUpdate = ({ location }) => {
  const view = document.getElementById("view-main");
  if (!view) {
    return;
  }

  const scrollbar = SmoothScrollbar.init(view, {
    renderByPixels: false,
    damping: 0.075,
  });

  const sessionItemName = `@scroll${location.pathname}`;
  const scroll = window.sessionStorage.getItem("scroll");

  if (scroll === "true") {
    scrollbar.scrollTo(0, window.sessionStorage.getItem(sessionItemName), 0);
  } else {
    window.sessionStorage.setItem("scroll", "true");
  }

  scrollbar.addListener((event) => {
    window.sessionStorage.setItem(sessionItemName, event.offset.y);
  });

  const images = document.querySelectorAll(
    ".gatsby-image-wrapper:not(.--no-transform) img"
  );

  images.forEach((image) => {
    const tl = new gsap.timeline({
      scrollTrigger: {
        trigger: image,
        scrub: true,
        start: "top bottom",
      },
    });

    tl.fromTo(
      image,
      {
        yPercent: -20,
        ease: "none",
      },
      {
        yPercent: 20,
        duration: 1,
        ease: "none",
      }
    );
  });
};

export const wrapRootElement = ({ element }) => (
  <ModalProvider>
    <ToastProvider>{element}</ToastProvider>
  </ModalProvider>
);
