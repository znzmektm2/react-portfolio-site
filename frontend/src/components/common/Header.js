import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import styled from "styled-components";

const HeaderBlock = styled.header`
  .logo {
    position: absolute;
    top: 100px;
    left: -10px;
    transform: rotate(-90deg);
    font-family: "LibreBarcode128Text-Regular";
    font-size: 1.6rem;
    z-index: 5;
  }

  .navBtn {
    position: fixed;
    top: 3.3125em;
    right: 3.3125em;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 0;
    z-index: 5;
    &:hover {
      cursor: pointer;
      span {
        &:nth-child(1) {
          -webkit-transform: translateY(8px) rotate(45deg);
          -ms-transform: translateY(8px) rotate(45deg);
          -o-transform: translateY(8px) rotate(45deg);
          transform: translateY(8px) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          -webkit-transform: translateY(-8px) rotate(-45deg);
          -ms-transform: translateY(-8px) rotate(-45deg);
          -o-transform: translateY(-8px) rotate(-45deg);
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }
    div {
      position: relative;
      display: inline-block;
      padding: 0.5em;
    }
    span {
      display: block;
      width: 28px;
      height: 3px;
      margin: 5px auto;
      background: #222;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    transform: translate3d(0, -100%, 0);
    transition: transform 1s cubic-bezier(0.8, 0, 0.2, 1);
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #141e27;
    }
    .navLinkWrap {
      text-align: center;
      z-index: 4;
      ul {
        li {
          padding: 0.5rem 0;
          font-family: "goku";
          font-size: 5rem;
          line-height: 6rem;
          a {
            position: relative;
            color: #fff;
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
  &.active {
    .logo {
      h1 {
        a {
          color: #fff;
        }
      }
    }
    .menu {
      transform: translate3d(0px, 0%, 0px);
    }
    .navBtn {
      span {
        background: #fff;
      }
    }
  }
`;

const Header = () => {
  const [active, setActive] = useState(false);

  // 메뉴 클릭시 header에 active 클래스 추가
  const handleClick = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <HeaderBlock className={active && "active"}>
      <div className="logo">
        <h1>
          <NavLink to="/" className="ease-in-out_03s">
            JeonAeRan
          </NavLink>
        </h1>
      </div>
      <div className="navBtn" onClick={handleClick}>
        <div>
          <span className="ease-in-out_03s"></span>
          <span className="ease-in-out_03s"></span>
          <span className="ease-in-out_03s"></span>
        </div>
      </div>
      <Menu handleClick={handleClick} />
    </HeaderBlock>
  );
};

export default Header;
