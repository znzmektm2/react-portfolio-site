import React from "react";
import { withRouter, NavLink, useHistory } from "react-router-dom";

export const DelayLink = ({ exact, to, addActiveClass, open, children }) => {
  let history = useHistory();

  const clickMenu = (e) => {
    e.preventDefault();
    addActiveClass();

    if (open) {
      setTimeout(() => {
        const root = document.getElementById("root");
        root.classList.add("fadeOut");
        setTimeout(() => {
          root.classList.remove("fadeOut");
          history.push(to);
        }, 500);
      }, 500);
    }
  };

  return (
    <NavLink exact to={to} onClick={clickMenu}>
      {children}
    </NavLink>
  );
};

export default withRouter(DelayLink);
