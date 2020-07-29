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
        padding: 0 12rem 0 16rem;
        li {
          padding: 0.2rem 0;
          overflow: hidden;

          &:before {
            content: "";
            opacity: 0;
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
            font-family: "goku";
            font-size: 5rem;
            line-height: 5.6rem;
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
            span {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow: hidden;
              &:before {
                position: absolute;
                top: 0;
                left: 0;
              }
              &.front {
                &:before {
                  transform: translateZ(0);
                  color: #c8c9b9;
                }
              }
              &.end {
                transform: translate3d(0, 100%, 0);
                &:before {
                  color: #ff1f44;
                  background: -webkit-linear-gradient(
                    -90deg,
                    #fd0000,
                    #ed1931,
                    #fd0c68,
                    #cb018f
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  transform: translate3d(0, -100%, 0);
                  opacity: 0;
                }
              }
            }
            &:not(.active):hover {
              .front {
                transform: translate3d(0, -100%, 0);
                transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                &:before {
                  transform: translate3d(0, 100%, 0);
                  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                  opacity: 1;
                }
              }
              .end {
                transform: translateZ(0);
                transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                &:before {
                  opacity: 1;
                  transform: translateZ(0);
                  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
              }
            }
            &.active {
              color: #ff1f44;
              background: -webkit-linear-gradient(
                -90deg,
                #fd0000,
                #ed1931,
                #fd0c68,
                #cb018f
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          &:nth-child(1) {
            span:before {
              content: "Home";
            }
          }
          &:nth-child(2) {
            span:before {
              content: "About";
            }
          }
          &:nth-child(3) {
            span:before {
              content: "Portfolios";
            }
          }
          &:nth-child(4) {
            span:before {
              content: "Design";
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

const Menu = ({ ...rest }) => {
  return (
    <MenuBlock className="menu">
      <Responsive>
        <div className="menuWrap">
          <ul className="menuList">
            <li>
              <DelayLink exact to="/" {...rest}>
                Home
                <span className="front" />
                <span className="end" />
              </DelayLink>
            </li>
            <li>
              <DelayLink to="/about" {...rest}>
                About
                <span className="front" />
                <span className="end" />
              </DelayLink>
            </li>
            <li>
              <DelayLink to="/portfolios" {...rest}>
                Portfolios
                <span className="front" />
                <span className="end" />
              </DelayLink>
            </li>
            <li>
              <DelayLink to="/design" {...rest}>
                Design
                <span className="front" />
                <span className="end" />
              </DelayLink>
            </li>
          </ul>
          <div className="menuText">
            <ul>
              <li>
                PORTFOLIOS → 52<span>·</span>
              </li>
              <li>
                DESIGN → 23<span>·</span>
              </li>
              <li>
                LAST UPDATE → AUGUST 2020<span>·</span>
              </li>
              <li>FRONTEND DEVELOPER → JEON AE RAN</li>
            </ul>
          </div>
        </div>
        <span className="line" />
      </Responsive>
    </MenuBlock>
  );
};

export default Menu;
