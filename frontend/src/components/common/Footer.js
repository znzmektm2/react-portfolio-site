import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { DelayLink } from "./DelayLink";
import useIO from "./../../lib/useIO";

const FooterBlock = styled.div`
  position: relative;
  .footerWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
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
        }
      }
    }
  }
  &.over {
    .footerWrap {
      background: #0b0b0c;
      .nextLink {
        a {
          color: #c8c9b9;
          &:after {
            width: 100%;
            transition: all 0.2s ease;
          }
        }
      }
    }
  }
  /* Design 페이지일 경우 */
  &.dark {
    .footerWrap {
      background: #0b0b0c;
      .nextLink {
        a {
          color: #c8c9b9;
          &:after {
            background: #222;
          }
        }
      }
    }

    &.over {
      .footerWrap {
        background: #fff;
        .nextLink {
          a {
            color: #222;
            &:after {
              width: 100%;
              transition: all 0.2s ease;
            }
          }
        }
      }
    }
  }
  .Footertarget {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 26px;
  }
`;

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
    <FooterBlock className="footer">
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
      <span className="Footertarget" ref={targetRef} />
    </FooterBlock>
  );
};

export default Footer;
