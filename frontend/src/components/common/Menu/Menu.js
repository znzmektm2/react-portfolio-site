import React from "react";
import "./Menu.scss";
import DelayLink from "./../DelayLink";
import MenuTextContainer from "./../../../containers/common/MenuTextContainer";

const Menu = ({ addHeaderActiveClass, open }) => {
  return (
    <div className="menu">
      <div className="wrap">
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
              <span />
            </li>
            <li>
              <DelayLink
                to="/about"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                About
              </DelayLink>
              <span />
            </li>
            <li>
              <DelayLink
                to="/portfolios"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                Portfolios
              </DelayLink>
              <span />
            </li>
            <li>
              <DelayLink
                to="/design?category=Photoshop"
                addHeaderActiveClass={addHeaderActiveClass}
                open={open}
              >
                Design
              </DelayLink>
              <span />
            </li>
          </ul>
          <MenuTextContainer />
        </div>
        <span className="line" />
      </div>
    </div>
  );
};

export default Menu;
