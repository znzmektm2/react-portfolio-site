import React, { useEffect } from "react";
import "./Home.scss";
import { TimelineMax } from "gsap";
import JarSvg from "./JarSvg";

const Home = ({ designNumber, portfolioNumber }) => {
  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];
    header.classList.add("home");
    header.classList.add("ani");

    // SVG 애니메이션
    const tl = new TimelineMax();
    setTimeout(() => {
      tl.to("#svg path", 2.5, {
        strokeDashoffset: 0,
      });
      tl.to("#svg path", 2.5, { "fill-opacity": 1, "stroke-opacity": 0 });

      // 메뉴 버튼 이벤트
      header.classList.remove("ani");
    }, 1000);

    return () => {
      header.classList.remove("home");
    };
  }, []);

  return (
    <div className="homeBlock">
      <div className="jarText">
        <h2>
          <JarSvg />
        </h2>
        <div className="pText">
          <p>
            <span className="strong">I’M A FRONTEND DEVELOPER </span>from Korea
            living in Yongin-si.
            <br />
            I create and build websites to communicate a feeling of joy and
            comfort.
            <br />
            For me, that means that the frontend development like HTML &amp;
            Scss, JS, and <br className="br" />
            WordPress is a part of my field of activity.
            <br />
            If you want to know more about me, feel free to contact me.
          </p>
        </div>
      </div>
      <ul className="portfolioNumber">
        <li>PORTFOLIOS → {portfolioNumber ? portfolioNumber : ""}</li>
        <li>DESIGN → {designNumber ? designNumber : ""}</li>
        <li>LAST UPDATE → AUGUST 2020</li>
      </ul>
      <div className="update">
        <span>LAST UPDATE:</span>
        <span>&nbsp;AUGUST 2020</span>
      </div>
    </div>
  );
};

export default Home;
