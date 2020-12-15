import React from "react";
import { Link } from "gatsby";

const NavLink = ({ children, to, setNavBoxBackground, pathname, color }) => {
  return (
    <div
      className="nav-link-wrap"
      onClick={() => {
        window.sessionStorage.setItem("scroll", "false");
      }}
    >
      <Link
        className="ca-nav-link"
        to={to}
        onMouseEnter={() => {
          setNavBoxBackground(color);
        }}
      >
        <div
          className={
            pathname === to
              ? "ca-nav-link-content -active"
              : "ca-nav-link-content"
          }
        >
          {children}
          <div
            className="ca-nav-link-circle"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default NavLink;
