import React from "react";
import DelayLink from "./../DelayLink";
import Responsive from "./../Responsive";
import MenuTextContainer from "./../../../containers/common/MenuTextContainer";
import "./Menu.scss";

const Menu = ({ addHeaderActiveClass, open }) => {
  return (
    <div className="menu">
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
          <MenuTextContainer />
        </div>
        <span className="line" />
      </Responsive>
    </div>
  );
};

export default Menu;
