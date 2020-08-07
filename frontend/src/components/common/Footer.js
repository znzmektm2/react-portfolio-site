import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { DelayLink } from "./DelayLink";
import useIO from "./../../lib/useIO";

const FooterBlock = styled.div`
  position: relative;
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: -2;
    .nextLink {
      margin-bottom: 3rem;
      overflow: hidden;
      a {
        position: relative;
        display: inline-block;
        padding: 0 1rem;
        display: inline-block;
        font-size: 11rem;
        line-height: 1.2em;
        letter-spacing: -0.02rem;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          display: inline-block;
          width: 0;
          height: 0.7rem;
          background: #c8c9b9;
          transition: all 0.2s ease;
        }
      }
    }

    &.over {
      background: #0b0b0c;
      .nextLink {
        a {
          color: #c8c9b9;
          &:after {
            width: 100%;
          }
        }
      }
    }
  }

  .target {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 26px;
  }
`;

const Footer = ({ next, to }) => {
  const targetRef = useRef(document.getElementsByClassName("target"));
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });
  const header = document.getElementsByTagName("header");
  const footer = document.getElementsByClassName("footer");

  useEffect(() => {
    setElements(targetRef.current);
  }, [setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header[0].classList.add("effective");
      } else {
        header[0].classList.remove("effective");
      }
    });
  }, [entries, observer, header]);

  const onMouseEnter = (e) => {
    header[0].classList.add("over");
    footer[0].classList.add("over");
  };

  const onMouseLeave = (e) => {
    header[0].classList.remove("over");
    footer[0].classList.remove("over");
  };

  return (
    <FooterBlock>
      <div className="footer">
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
      <span className="target" />
    </FooterBlock>
  );
};

export default Footer;
