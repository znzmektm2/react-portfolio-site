import React from "react";
import { withRouter, NavLink, useHistory } from "react-router-dom";

export const DelayLink = ({ to, addHeaderActiveClass, open, children }) => {
  let history = useHistory();

  const clickLink = (e) => {
    e.preventDefault();

    addHeaderActiveClass && addHeaderActiveClass();

    document.querySelector(".menuList li a.active").classList.remove("active");
    e.target.classList.add("active");

    const header = document.getElementsByTagName("header")[0];
    const footer = document.getElementsByClassName("footer")[0];

    header.classList.remove("effective");
    header.classList.remove("over");

    if (to !== "/design") {
      footer.classList.remove("dark");
      header.classList.remove("dark");
    }

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
        addHeaderActiveClass ? 500 : 0
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
