import React from "react";
import styled from "styled-components";
import DelayLink from "./DelayLink";
import Responsive from "./Responsive";

const MenuBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate3d(0, -100%, 0);
  transition-delay: 0.8s;
  z-index: 4;
  overflow: hidden;
  .resposiveBlock {
    padding: 60px 125px;
    height: 100%;
    .menuWrap {
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      flex-direction: row-reverse;
      ul.menuList {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: right;
        padding: 0 12rem 0 12rem;
        li {
          padding-left: 5rem;
          overflow: hidden;

          &:before {
            content: "";
            opacity: 0;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scale(1.1);
            -webkit-transition: all 1s ease-out;
            -moz-transition: all 1s ease-out;
            -o-transition: all 1s ease-out;
            transition: all 1s ease-out;
            z-index: -2;
          }

          &:nth-child(1) {
            &:before {
              background: url(/images/home.jpg) right no-repeat;
              background-size: cover;
            }
          }
          &:nth-child(2) {
            &:before {
              background: url(/images/about.jpg) center no-repeat;
              background-size: cover;
            }
          }
          &:nth-child(3) {
            &:before {
              background: url(/images/porfolios.png) center no-repeat;
              transform: scale(0.9);
            }
          }
          &:nth-child(4) {
            &:before {
              background: url(/images/design.jpg) center no-repeat;
            }
          }

          &:hover {
            &:before {
              z-index: -1;
              transform: scale(1);
            }
            &:nth-child(1) {
              &:before {
                opacity: 0.3;
              }
            }
            &:nth-child(2) {
              &:before {
                opacity: 0.06;
              }
            }
            &:nth-child(3) {
              &:before {
                transform: scale(0.8);
                opacity: 0.05;
              }
            }
            &:nth-child(4) {
              &:before {
                opacity: 0.06;
              }
            }
          }

          a {
            position: relative;
            padding-left: 2.5rem;
            font-family: "goku";
            font-size: 5rem;
            line-height: 6rem;
            color: #e0e0dc;
            transform: translate3d(0, 110%, 0);
            transition-delay: 0.8s;
            animation: 0.3s ease forwards fadeOut;

            @keyframes fadeOut {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
            &:before {
              content: "";
              position: absolute;
              top: 10%;
              left: 0;
              display: block;
              width: 117%;
              height: 76%;
              z-index: -1;
              transform: translate3d(100%, 0, 0) skew(-45deg);
              transition: all 0.4s cubic-bezier(0.16, 1.08, 0.38, 0.98);
              background: linear-gradient(
                180deg,
                #ff2f00,
                #ed1931,
                #fd0c68,
                #cb018f
              );
              opacity: 0.9;
            }
            &.active {
              color: #141e27;
              &:before {
                transform: translate3d(0%, 0, 0) skew(-45deg);
              }
            }
          }
        }
      }
      .menuText {
        overflow: hidden;
        ul {
          transform: translate3d(-100%, 0, 0);
          transition-delay: 0.8s;
          animation: 0.3s ease forwards fadeOut;
          @keyframes fadeOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          li {
            position: relative;
            display: inline-block;
            font-family: "trump-gothic-pro";
            color: #c8c9b9;
            font-size: 1.15rem;
            letter-spacing: 0.5px;
            span {
              padding: 0 10px;
            }
          }
        }
      }
    }
    .line {
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, #ff3000, #020faf, #ff096c, #d50082);
      opacity: 0.3;
      transform: translate3d(-100%, 0, 0);
    }
  }
`;

const Menu = ({
  addHeaderActiveClass,
  open,
  designNumber,
  portfolioNumber,
}) => {
  return (
    <MenuBlock className="menu">
      <Responsive>
        <div className="menuWrap">
          <ul className="menuList">
            <li>
              <DelayLink
                exact
                to="/"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                Home
              </DelayLink>
            </li>
            <li>
              <DelayLink
                to="/about"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                About
              </DelayLink>
            </li>
            <li>
              <DelayLink
                to="/portfolios"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                Portfolios
              </DelayLink>
            </li>
            <li>
              <DelayLink
                to="/design"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                Design
              </DelayLink>
            </li>
          </ul>
          <div className="menuText">
            <ul>
              <li>
                FRONTEND DEVELOPER<span>·</span>
              </li>
              <li>
                PORTFOLIOS → {portfolioNumber ? portfolioNumber : ""}
                <span>·</span>
              </li>
              <li>
                DESIGN → {designNumber ? designNumber : ""}
                <span>·</span>
              </li>
              <li>LAST UPDATE → AUGUST 2020</li>
            </ul>
          </div>
        </div>
        <span className="line" />
      </Responsive>
    </MenuBlock>
  );
};

export default Menu;
