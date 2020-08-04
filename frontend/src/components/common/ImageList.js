import React from "react";
import PropTypes from "prop-types";
import DelayLink from "./DelayLink";
import styled from "styled-components";

const ImageListBlock = styled.li`
  display: inline-block;
  vertical-align: middle;
  padding: 1rem;
  width: 25%;
  line-height: 0;
  opacity: 0;
  box-sizing: border-box;
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  &.appear {
    opacity: 1;
  }

  a {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    overflow: hidden;
    &:after {
      content: "";
      display: block;
      height: 0;
      padding-bottom: 100%;
    }
    .imgBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .txtBox {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding: 3rem 2rem;
      &:before {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        width: 101%;
        height: 0;
        background: #000506;
        opacity: 0.85;
      }
      .wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        .type {
          margin-bottom: 0.7rem;
          display: block;
          overflow: hidden;
          span {
            display: inline-block;
            font-family: trump-gothic-pro;
            font-size: 1.1rem;
            line-height: 1.1rem;
            color: #c8c9b9;
            letter-spacing: 1.3px;
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
        }
        h3 {
          position: relative;
          display: inline-block;
          padding-bottom: 2.2rem;
          overflow: hidden;
          :after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 4rem;
            height: 3px;
            background: #c8c9b9;
            transform: translate3d(-100%, 0, 0);
          }
          span {
            display: inline-block;
            font-family: "goku";
            font-size: 3.2rem;
            line-height: 3.5rem;
            color: #c8c9b9;
            font-weight: 400;
            letter-spacing: -1px;
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
        }
        h4 {
          margin-top: 1rem;
          display: inline-block;
          overflow: hidden;
          span {
            display: inline-block;
            font-family: "KoPub Batang", serif;
            font-size: 1em;
            line-height: 2rem;
            color: #c8c9b9;
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
        }
      }
    }
    &:hover {
      .txtBox {
        &:before {
          height: 101%;
          transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
        }
        .type {
          span {
            opacity: 1;
            transform: translate3d(0, 0%, 0);
            transition: transform 0.5s ease;
          }
        }
        h3 {
          span {
            opacity: 1;
            transform: translate3d(0, 0%, 0);
            transition: transform 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
          }
          &:after {
            transform: translate3d(0%, 0, 0);
            transition: transform 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
          }
        }
        h4 {
          span {
            opacity: 1;
            transform: translate3d(0, 0%, 0);
            transition: transform 0.5s ease;
          }
        }
      }
    }
  }
`;

const ImageList = ({
  id,
  client,
  web,
  singlePage,
  src,
  srcSet,
  alt,
  isLazy = false,
}) => {
  return (
    <>
      <ImageListBlock className={isLazy ? "lazy" : ""}>
        <DelayLink to={`/portfolio/${id}`} open="true">
          <div className="imgBox">
            <img
              src={src}
              alt={alt}
              srcSet={isLazy ? "" : srcSet}
              data-srcset={srcSet}
              data-src={src}
            />
          </div>
          <div className="txtBox">
            <div className="wrap">
              <div className="type">
                <span>
                  {web && "WEB"}
                  {singlePage && "SINGLEPAGE"}
                </span>
              </div>
              <h3>
                <span>{id}</span>
              </h3>
              <h4>
                <span>{client}</span>
              </h4>
            </div>
          </div>
        </DelayLink>
      </ImageListBlock>
    </>
  );
};

ImageList.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageList;
