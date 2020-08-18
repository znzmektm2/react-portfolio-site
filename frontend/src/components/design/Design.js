import React from "react";
import styled from "styled-components";
import Responsive from "./../common/Responsive";

const DesignBlock = styled.div`
  position: relative;
  padding: 0 0 10rem;
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
            top: -26px;
            right: 94%;
            padding-left: 1rem;
            font-size: 12px;
            line-height: 18px;
            color: #fff;
            white-space: nowrap;
            transform: rotate(-90deg);
            transform-origin: right bottom;
            &:before {
              content: "";
              position: absolute;
              top: 40%;
              left: 0;
              width: 10px;
              height: 1px;
              background: #fff;
            }
          }
          span {
            position: relative;
            display: block;
            max-height: 50vh;
            box-shadow: 0 0 20px #252525;
            overflow: hidden;
            &:before {
              content: "";
              position: absolute;
              top: -10%;
              left: 0;
              width: 100%;
              height: 40%;
              background-image: linear-gradient(
                0deg,
                rgba(12, 12, 18, 0),
                #0b0b0d
              );
              z-index: 1;
            }
            &:after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -10%;
              width: 100%;
              height: 40%;
              background-image: linear-gradient(
                0deg,
                #0b0b0d,
                rgba(12, 12, 18, 0)
              );
              z-index: 1;
            }
            img {
              width: 100%;

              filter: grayscale(1);
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
  return (
    <DesignBlock>
      <Responsive>
        <div className="designList">
          <ul>
            <li>
              <a href="/">
                <h3>한무드 쇼핑몰 플래시 배너</h3>
                <span>
                  <img src="/images/photoshop/flash1.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <h3>GBEC 영어캠프 배너</h3>
                <span>
                  <img src="/images/photoshop/gmk_banner.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <h3>GBEC 영어캠프 메인배너</h3>
                <span>
                  <img src="/images/photoshop/gmk_main.jpg" alt="" />
                </span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/">
                <h3>GBEC 영어캠프 팝업창1</h3>
                <span>
                  <img src="/images/photoshop/gmk_vipg.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <h3>GBEC 영어캠프 팝업창2</h3>
                <span>
                  <img src="/images/photoshop/gmk_SILITE.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <h3>한무드 회사연혁1</h3>
                <span>
                  <img src="/images/photoshop/h_history1.jpg" alt="" />
                </span>
              </a>
            </li>
            <li>
              <a href="/">
                <h3>한무드 회사연혁2</h3>
                <span>
                  <img src="/images/photoshop/h_history2.jpg" alt="" />
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
