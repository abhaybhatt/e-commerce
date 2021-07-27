import React from "react";
import "./Base.css";
import Menu from "../menu/Menu";
const Base = ({
  heading = "Home Page",
  description = "This is page description",
  footer = "If you got any question feel free to reach out",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="page_heading">{heading}</div>
      <div className="page_description">{description}</div>
      <div>{children}</div>
      <footer className="page_footer">
        <h4>{footer}</h4>
        <button>Contact us</button>
      </footer>
    </div>
  );
};
export default Base;
