import React from "react";
import Home from "./../components/home/Home";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <div className="page home">
        <Home />
      </div>
      <Footer to="/about" next="About" />
    </>
  );
};

export default HomePage;
