import React, { useEffect, useRef } from "react";
import "./Footer.scss";
import { DelayLink } from "./../DelayLink";
import useIO from "./../../../lib/useIO";

const Footer = ({ next, to }) => {
  const targetRef = useRef();
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });
  const header = document.getElementsByTagName("header")[0];
  const footer = document.getElementsByClassName("footer")[0];

  useEffect(() => {
    setElements([targetRef.current]);
  }, [setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.add("effective");
      } else {
        header.classList.remove("effective");
      }
    });
  }, [entries, observer, header]);

  const onMouseEnter = (e) => {
    header.classList.add("over");
    footer.classList.add("over");
  };

  const onMouseLeave = (e) => {
    header.classList.remove("over");
    footer.classList.remove("over");
  };

  return (
    <div className="footer">
      <div className="footerWrap">
        <div
          className="nextLink"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <DelayLink to={to} open="true">
            {next}
          </DelayLink>
        </div>
      </div>
      <span className="footertarget" ref={targetRef} />
    </div>
  );
};

export default Footer;
