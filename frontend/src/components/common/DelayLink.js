import React from "react";
import { NavLink, useHistory } from "react-router-dom";

export const DelayLink = ({ to, addHeaderActiveClass, open, children }) => {
  const history = useHistory();

  const clickLink = (e) => {
    e.preventDefault();

    // 메뉴 클릭시 header에 active 클래스 추가
    addHeaderActiveClass && addHeaderActiveClass();

    // 화면 전환 애니메이션
    const header = document.getElementsByTagName("header")[0];
    const root = document.getElementById("root");

    if (open) {
      setTimeout(
        () => {
          root.classList.add("fadeOut");
          setTimeout(() => {
            root.classList.remove("fadeOut");
            header.classList.remove("effective");
            header.classList.remove("over");
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

export default DelayLink;
