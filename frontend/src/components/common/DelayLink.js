import React from "react";
import { withRouter, NavLink, useHistory } from "react-router-dom";

export const DelayLink = ({ exact, to, addActiveClass, open, children }) => {
  let history = useHistory();

  const clickLink = (e) => {
    e.preventDefault();
    addActiveClass && addActiveClass();

    const header = document.getElementsByTagName("header");
    header[0].classList.remove("effective");
    header[0].classList.remove("over");

    if (open) {
      setTimeout(
        () => {
          const root = document.getElementById("root");
          root.classList.add("fadeOut");
          setTimeout(() => {
            root.classList.remove("fadeOut");
            history.push(to);
            window.scroll(0, 0);
          }, 500);
        },
        addActiveClass ? 500 : 0
      );
    }
  };

  return (
    <NavLink exact to={to} onClick={clickLink}>
      {children}
    </NavLink>
  );
};

export default withRouter(DelayLink);
