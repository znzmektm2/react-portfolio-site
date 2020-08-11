import React from "react";
import Footer from "../components/common/Footer";
import Home from "./../components/home/Home";

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
