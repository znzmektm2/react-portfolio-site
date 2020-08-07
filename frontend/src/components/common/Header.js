import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import styled from "styled-components";

const HeaderBlock = styled.header`
  .logo {
    position: fixed;
    top: 50px;
    left: 96px;
    font-size: 1.61rem;
    transform: rotate(90deg);
    transform-origin: left top;
    z-index: 5;
    h1 {
      a {
        font-family: "LibreBarcode128Text-Regular";
        line-height: 3.2rem;
        transition: 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
    &.cubicBezier {
      h1 {
        a {
          transition: all 1s ease-in-out;
        }
      }
    }
  }
  .navBtn {
    position: fixed;
    top: 50px;
    right: 50px;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 0;
    overflow: hidden;
    z-index: 5;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, #fd0000, #ed1931, #fd0c68, #cb018f);
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
      background: linear-gradient(180deg, #fd0000, #ed1931, #fd0c68, #cb018f);
      transform: translate3d(0, -105%, 0);
      transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
      opacity: 1;
    }

    .burgerLine {
      position: relative;
      display: inline-block;
      padding: 1.782rem 1.563rem;
      transition: 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      span {
        display: block;
        width: 20px;
        height: 2px;
        margin: 2px auto;
        background: #222;
        transition: 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        &:nth-child(2) {
          height: 1px;
        }
      }
    }

    .btnLine {
      position: absolute;
      opacity: 0.6;
      &.step1 {
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #fd0000;
      }
      &.step2 {
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, #fd0000, #ed1931, #fd0c68, #cb018f);
      }
      &.step3 {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #cb018f;
      }
      &.step4 {
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, #fd0000, #ed1931, #fd0c68, #cb018f);
      }
    }

    &:hover {
      cursor: pointer;
      &:before {
        transform: translateZ(0);
        transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
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

  .bg {
    position: fixed;
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
      background: #c8c9b9;
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
  &#active {
    z-index: 5;
    .logo {
      h1 {
        a {
          color: #c8c9b9;
        }
      }
    }
    .navBtn {
      div {
        opacity: 0.9;
        span {
          background: #fff;
          opacity: 0.9;
          &:nth-child(1) {
            -webkit-transform: translateY(4px) rotate(45deg);
            -ms-transform: translateY(4px) rotate(45deg);
            -o-transform: translateY(4px) rotate(45deg);
            transform: translateY(4px) rotate(45deg);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            -webkit-transform: translateY(-3px) rotate(-45deg);
            -ms-transform: translateY(-3px) rotate(-45deg);
            -o-transform: translateY(-3px) rotate(-45deg);
            transform: translateY(-3px) rotate(-45deg);
          }
        }
      }
    }
    .menu {
      transform: translate3d(0, 0%, 0);
      transition-delay: 1s;
      .menuWrap {
        ul.menuList {
          li {
            &:before {
              display: block;
            }
            a {
              transform: translate3d(0, 0%, 0);
              transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.2s;
              animation: 0.8s ease 1.2s fadein;
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
        .menuText {
          ul {
            transform: translate3d(0%, 0, 0);
            transition: transform 1.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.1s;
            animation: 1.1s ease 1.1s fadein;
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
    .bg {
      transform: translate3d(0px, 0%, 0px);
      &:before {
        content: "";
        transform: translate3d(0px, 0%, 0px);
      }
      &.step1 {
        transition: transform 1s cubic-bezier(0.7, 0.1, 0.4, 1);
      }
      &.step2 {
        transition: transform 1s cubic-bezier(0.6, 0.1, 0.3, 1);
        &:before {
          transition: transform 0.6s cubic-bezier(0.6, 0.1, 0.3, 1);
          transition-delay: 1s;
        }
      }
      &.step3 {
        transition: transform 1s cubic-bezier(0.5, 0.1, 0.2, 1);
        &:before {
          transition: transform 0.6s cubic-bezier(0.5, 0.1, 0.2, 1);
          transition-delay: 1s;
        }
      }
      &.step4 {
        transition: transform 1s cubic-bezier(0.4, 0.1, 0.1, 1);
        &:before {
          transition: transform 0.6s cubic-bezier(0.4, 0.1, 0.1, 1);
          transition-delay: 1s;
        }
      }
    }
    .line {
      transform: translate3d(0%, 0, 0px);
      transition: transform 1s ease-out;
      transition-delay: 1s;
    }
  }

  /* 페이지 하단 텍스트 호버시 */
  &.effective {
    &.over {
      .logo {
        h1 {
          a {
            color: #c8c9b9;
          }
        }
      }
      .navBtn {
        div {
          opacity: 0.9;
          span {
            background: #fff;
            opacity: 0.9;
          }
        }
      }
    }
  }
`;

const Header = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const logo = document.getElementsByClassName("logo");

  // 메뉴 클릭시 header에 active 클래스 추가
  const addActiveClass = useCallback(() => {
    if (open) {
      setActive(!active);
      setOpen(false);
      logo[0].classList.add("cubicBezier");
      setTimeout(() => {
        setOpen(true);
        logo[0].classList.remove("cubicBezier");
      }, 1100);
    }
  }, [active, open, logo]);

  return (
    <HeaderBlock id={active ? "active" : ""}>
      <div className="logo">
        <h1>
          <NavLink to="/">JeonAeRan</NavLink>
        </h1>
      </div>
      <div className="navBtn" onClick={addActiveClass}>
        <div className="burgerLine">
          <span />
          <span />
          <span />
        </div>
        <span className="btnLine step1" />
        <span className="btnLine step2" />
        <span className="btnLine step3" />
        <span className="btnLine step4" />
      </div>
      <Menu addActiveClass={addActiveClass} open={open} />
      <div className="bg step1" />
      <div className="bg step2" />
      <div className="bg step3" />
      <div className="bg step4" />
    </HeaderBlock>
  );
};

export default Header;
