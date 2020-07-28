import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Responsive from "./Responsive";

const Menu = ({ handleClick }) => {
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink exact to="/" onClick={handleClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleClick}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolios" onClick={handleClick}>
            Portfolios
          </NavLink>
        </li>
        <li>
          <NavLink to="/design" onClick={handleClick}>
            Design
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
