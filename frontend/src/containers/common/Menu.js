import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

const MenuBlock = styled.div`
  ul {
    li {
      font-family: "goku";
      font-size: "2rem";
    }
  }
`;

const Menu = () => {
  const activeStyle = {
    color: "#aaa",
  };

  return (
    <MenuBlock>
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeStyle={activeStyle}>
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolios" activeStyle={activeStyle}>
            PORTFOLIOS
          </NavLink>
        </li>
        <li>
          <NavLink to="/write" activeStyle={activeStyle}>
            WRITE
          </NavLink>
        </li>
        <li>
          <NavLink to="/design" activeStyle={activeStyle}>
            DESIGN
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeStyle={activeStyle}>
            ADMIN
          </NavLink>
        </li>
      </ul>
    </MenuBlock>
  );
};

export default withRouter(Menu);
