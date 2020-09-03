import React from "react";

const Responsive = ({ children, ...rest }) => {
  return (
    <div {...rest} className="resposiveBlock">
      {children}
    </div>
  );
};

export default Responsive;
