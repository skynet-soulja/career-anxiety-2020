import React from "react";
import { ModalProvider } from "./src/context/ModalContext";
import { ToastProvider } from "./src/context/ToastContext";

export const wrapRootElement = ({ element }) => (
  <ModalProvider>
    <ToastProvider>{element}</ToastProvider>
  </ModalProvider>
);
