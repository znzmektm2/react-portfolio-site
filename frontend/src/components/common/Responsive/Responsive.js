import React from "react";
import "./Responsive.scss";

const Responsive = ({ children, ...rest }) => {
  return (
    <div {...rest} className="resposiveBlock">
      {children}
    </div>
  );
};

export default Responsive;
