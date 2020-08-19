import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Design from "../../components/design/Design";
import DesignCategory from "./../../components/design/DesignCategory";

const DesignContainer = ({ location }) => {
  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];
    const pageTitle = document.getElementsByClassName("pageTitle")[0];
    const footer = document.getElementsByClassName("footer")[0];

    if (location.pathname === "/design") {
      header.classList.add("dark");
      pageTitle.classList.add("dark");
      footer.classList.add("dark");
    }
  }, [location]);
  return (
    <>
      <DesignCategory />
      <Design />
    </>
  );
};

export default withRouter(DesignContainer);
