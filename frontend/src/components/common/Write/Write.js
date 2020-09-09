import React, { useEffect } from "react";
import "./Write.scss";

const Write = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
    const input = document.getElementsByTagName("input");
    const inputArr = [...input];
    inputArr.map((i) => {
      return (
        i.type === "text" &&
        i.value !== "" &&
        i.parentNode.classList.add("value")
      );
    });
  }, []);

  return <div className="writeBlock">{props.children}</div>;
};

export default Write;
