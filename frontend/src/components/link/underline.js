import React from "react";
import { Link } from "gatsby";

const Underline = ({ children, to }) => {
  return (
    <div
      className="ca-link-underline-wrap"
      onClick={() => {
        window.sessionStorage.setItem("scroll", "false");
      }}
    >
      <Link to={to} className="ca-link-underline">
        {children}
      </Link>
    </div>
  );
};

export default Underline;
