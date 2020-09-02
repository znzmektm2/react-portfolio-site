import React, { useState, useCallback } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import Menu from "./../Menu";
import LogoSvg from "./LogoSvg";

const Header = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);

  // 메뉴 클릭시 header에 active 클래스 추가
  const addHeaderActiveClass = useCallback(() => {
    const logo = document.getElementsByClassName("logo");

    if (open) {
      setActive(!active);
      setOpen(false);
      logo[0].classList.add("cubicBezier");
      setTimeout(() => {
        setOpen(true);
        logo[0].classList.remove("cubicBezier");
      }, 1100);
    }
  }, [active, open]);

  return (
    <header className="headerBlock" id={active ? "active" : ""}>
      <div className="logo">
        <h1>
          <NavLink to="/">
            <LogoSvg />
          </NavLink>
        </h1>
      </div>
      <div className="navBtn" onClick={addHeaderActiveClass}>
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
      <Menu addHeaderActiveClass={addHeaderActiveClass} open={open} />
      <div className="bg step1" />
      <div className="bg step2" />
      <div className="bg step3" />
      <div className="bg step4" />
    </header>
  );
};

export default Header;
