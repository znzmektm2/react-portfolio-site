import React, { useEffect } from "react";
import styled from "styled-components";
import Responsive from "./../common/Responsive";

const DesignBlock = styled.div`
  position: relative;
  padding: 10rem 0;
  background: none;
  color: #c8c9b9;
  overflow: hidden;
  z-index: 1;
  .resposiveBlock {
    max-width: 1500px;
  }
  .designList {
    position: relative;
    margin: 0 auto;
    max-width: 100%;

    ul {
      width: 50%;
      display: inline-block;
      vertical-align: top;
      li {
        margin-bottom: 15vh;
        width: 100%;
        display: inline-block;
        vertical-align: top;
        line-height: 0;
        a {
          position: relative;
          padding: 5rem;
          min-width: 90%;
          h3 {
            position: absolute;
            top: -0.8rem;
            right: 94%;
            padding-left: 1.1rem;
            font-family: "KoPub Batang", serif;
            font-size: 12px;
            line-height: 18px;
            color: #afafaf;
            white-space: nowrap;
            transform: rotate(-90deg);
            transform-origin: right bottom;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            &:before {
              content: "";
              position: absolute;
              top: 40%;
              left: 0;
              width: 10px;
              height: 1px;
              background: #fff;
            }
            .category {
              padding-right: 0.4rem;
              display: inline-block;
              z-index: 2;
            }
          }

          .imgWrap {
            position: relative;
            display: block;
            max-height: 50vh;
            box-shadow: 0 0 20px #252525;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            &:before {
              content: "";
              position: absolute;
              top: -10px;
              left: 0;
              width: 100%;
              height: 9rem;
              background-image: linear-gradient(
                0deg,
                rgba(12, 12, 12, 0),
                #292929
              );
              z-index: 1;
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            }
            img {
              width: 100%;
              opacity: 0.75;
              filter: grayscale(1);
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            }
          }
          &:hover {
            h3 {
              color: #fff;
            }
            .imgWrap {
              &:before {
                opacity: 0;
              }
              img {
                opacity: 1;
              }
            }
          }

          &.active {
            h3 {
              top: 2.3rem;
              color: #fff;
            }
            .imgWrap {
              max-height: 100vh;
              transform: translateY(-1.5rem);
              &:before {
                opacity: 0;
              }
              img {
                opacity: 1;
                filter: none;
              }
            }
          }
        }
      }
      &:first-child {
        margin-top: 30vh;
        margin-left: -5rem;
      }
      &:last-child {
        margin-right: -5rem;
        float: right;
        text-align: right;
      }
    }
  }
`;

const Design = () => {
  const onClick = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("active");
  };

  useEffect(() => {}, []);

  return (
    <DesignBlock>
      <Responsive>
        <div className="designList">
          <ul>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>한무드 쇼핑몰
                  플래시 배너
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/flash1.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>GBEC 영어캠프 배너
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/gmk_banner.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>GBEC 영어캠프
                  메인배너
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/gmk_main.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>한무드 회사연혁2
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/h_history2.jpg" alt="" />
                </span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>GBEC 영어캠프
                  팝업창1
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/gmk_vipg.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>GBEC 영어캠프
                  팝업창2
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/gmk_SILITE.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/" onClick={onClick}>
                <h3>
                  <span className="category">PHOTOSHOP.</span>한무드 회사연혁1
                </h3>
                <span className="imgWrap">
                  <img src="/images/photoshop/h_history1.jpg" alt="" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Responsive>
    </DesignBlock>
  );
};

export default Design;
