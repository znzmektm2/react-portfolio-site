import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import styled from "styled-components";
import Responsive from "./Responsive";

const HeaderBlock = styled.header`
  .logo {
    position: fixed;
    top: 102px;
    left: -18px;
    transform: rotate(90deg);
    font-size: 1.61rem;
    z-index: 5;
    h1 {
      a {
        font-family: "LibreBarcode128Text-Regular";
        line-height: 3.2rem;
      }
    }
  }
  .navBtn {
    position: fixed;
    top: 50px;
    right: 33px;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 0;
    border: 1px solid;
    border-image-slice: 1;
    border-image-source: -webkit-linear-gradient(
      -90deg,
      #ff3000,
      #ed0200,
      #ff096c,
      #d50082
    );
    overflow: hidden;
    z-index: 5;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
      transform: translate3d(0, 105%, 0);
      opacity: 0;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
      transform: translate3d(0, -105%, 0);
      transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
      opacity: 1;
    }

    div {
      position: relative;
      display: inline-block;
      padding: 1.282rem 1.125rem;
    }
    span {
      display: block;
      width: 22px;
      height: 2px;
      margin: 3px auto;
      background: #222;
      &:nth-child(2) {
        height: 1px;
      }
    }
    &:hover {
      cursor: pointer;
      &:before {
        transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
        transform: translateZ(0);
        opacity: 1;
      }
      &:after {
        transition: none;
        transform: translateZ(0);
        opacity: 0;
      }
      span {
        background: #fff;
      }
    }
  }
  .menuWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, -100%, 0);
    transition-delay: 0.8s;
    z-index: 4;
    .resposiveBlock {
      padding: 50px 125px;
      height: 100%;
      .menu {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        ul {
          li {
            padding: 0.2rem 0;
            overflow: hidden;
            a {
              position: relative;
              font-family: "goku";
              font-size: 4.6rem;
              line-height: 5.4rem;
              color: #fff;
              transform: translate3d(0, -115%, 0);
              transition-delay: 0.8s;
              animation: 0.3s cubic-bezier(0.5, 0, 0.4, 1) 0s normal forwards 1
                fadeOut;
              @keyframes fadeOut {
                0% {
                  opacity: 1;
                }
                100% {
                  opacity: 0;
                }
              }
              &.active {
                color: #ff1f44;
                background: -webkit-linear-gradient(
                  -90deg,
                  #ff3000,
                  #ed0200,
                  #ff096c,
                  #d50082
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }
    }
  }

  .bg {
    position: absolute;
    top: 0;
    width: 25%;
    height: 100%;
    background: #141e27;
    transform: translate3d(0, -100%, 0);
    transition: transform 1.1s cubic-bezier(0.2, 0.9, 0.1, 1);
    z-index: 3;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 100%;
      background: #aaa;
      opacity: 0.15;
      transform: translate3d(0, -100%, 0);
      transition: transform 1.1s cubic-bezier(0.2, 0.9, 0.1, 1);
    }
    &.step1 {
      left: 0;
      &:before {
        display: none;
      }
    }
    &.step2 {
      left: 25%;
    }
    &.step3 {
      left: 50%;
    }
    &.step4 {
      left: 75%;
    }
  }

  /* 메뉴 클릭시 */
  &.active {
    z-index: 5;
    .menuWrap {
      transform: translate3d(0, 0%, 0);
      transition: transform 1.1s cubic-bezier(0.6, 0.1, 0.1, 1);
      .resposiveBlock {
        .menu {
          ul {
            li {
              a {
                /* opacity: 1; */
                transform: translate3d(0, 0%, 0);
                transition: transform 1.1s cubic-bezier(0.2, 0.5, 0.2, 1) 0.8s;
                animation: 1s cubic-bezier(0.2, 0.5, 0.2, 1) 0.8s normal
                  forwards 1 fadein;
                @keyframes fadein {
                  0% {
                    opacity: 0;
                  }
                  100% {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
    .logo {
      h1 {
        a {
          color: #fff;
        }
      }
    }
    .navBtn {
      div {
        padding: 1.25rem 1.313rem;
        span {
          background: #fff;
          height: 2px;
          width: 16px;
          &:nth-child(1) {
            -webkit-transform: translateY(5px) rotate(45deg);
            -ms-transform: translateY(5px) rotate(45deg);
            -o-transform: translateY(5px) rotate(45deg);
            transform: translateY(5px) rotate(45deg);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            -webkit-transform: translateY(-5px) rotate(-45deg);
            -ms-transform: translateY(-5px) rotate(-45deg);
            -o-transform: translateY(-5px) rotate(-45deg);
            transform: translateY(-5px) rotate(-45deg);
          }
        }
      }
    }
    .bg {
      transform: translate3d(0px, 0%, 0px);
      &:before {
        content: "";
        transform: translate3d(0px, 0%, 0px);
      }
      &.step1 {
        transition: transform 1.1s cubic-bezier(0.9, 0.1, 0.4, 1);
      }
      &.step2 {
        transition: transform 1.1s cubic-bezier(0.8, 0.1, 0.3, 1);
        &:before {
          transition: transform 1.1s cubic-bezier(0.8, 0.1, 0.3, 1);
          transition-delay: 0.5s;
        }
      }
      &.step3 {
        transition: transform 1.1s cubic-bezier(0.7, 0.1, 0.2, 1);
        &:before {
          transition: transform 1.1s cubic-bezier(0.7, 0.1, 0.2, 1);
          transition-delay: 0.5s;
        }
      }
      &.step4 {
        transition: transform 1.1s cubic-bezier(0.6, 0.1, 0.1, 1);
        &:before {
          transition: transform 1.1s cubic-bezier(0.6, 0.1, 0.1, 1);
          transition-delay: 0.5s;
        }
      }
    }
  }
`;

const Header = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);

  // 메뉴 클릭시 header에 active 클래스 추가
  const handleClick = useCallback(() => {
    if (open) {
      setActive(!active);
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 1100);
    }
  }, [active, open]);

  return (
    <HeaderBlock className={active && "active"}>
      <div className="logo">
        <h1>
          <NavLink to="/" className="ease-in-out_1s">
            JeonAeRan
          </NavLink>
        </h1>
      </div>
      <div className="navBtn" onClick={handleClick}>
        <div className="ease-in-out_03s">
          <span className="ease-in-out_03s"></span>
          <span className="ease-in-out_03s"></span>
          <span className="ease-in-out_03s"></span>
        </div>
      </div>
      <div className="menuWrap">
        <Responsive>
          <Menu handleClick={handleClick} />
        </Responsive>
      </div>
      <div className="bg step1" />
      <div className="bg step2" />
      <div className="bg step3" />
      <div className="bg step4" />
    </HeaderBlock>
  );
};

export default Header;
