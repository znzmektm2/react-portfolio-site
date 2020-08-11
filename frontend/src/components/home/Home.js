import React, { useEffect } from "react";
import styled from "styled-components";

const HomeBlock = styled.div`
  @keyframes height5vw {
    0% {
      height: 0;
    }
    100% {
      height: 5vw;
    }
  }

  @keyframes opacity05 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

  @keyframes y100 {
    0% {
      opacity: 0;
      transform: translate3d(0px, 100%, 0px);
    }
    100% {
      opacity: 1;
      transform: translate3d(0px, 0%, 0px);
    }
  }

  @keyframes x-100 {
    0% {
      transform: translate3d(-100%, 0px, 0px);
    }
    100% {
      transform: translate3d(0%, 0%, 0px);
    }
  }

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #15222d;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/images/home.jpg) bottom right no-repeat;
    opacity: 0;
    animation: 3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 1.5s opacity05;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1px;
    height: 0;
    background: linear-gradient(180deg, #ff2f00, #ed1931, #fd0c68, #cb018f);
    animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 3.4s height5vw;
  }
  .textWrap {
    position: relative;
    margin-top: -1vh;
    width: 70vw;
    z-index: 1;
    h2 {
      width: 35vw;
      line-height: 0;
    }
    .pTxt {
      position: absolute;
      top: 9vw;
      right: 0;
      width: 35vw;
      overflow: hidden;
      p {
        padding-left: calc(1.1rem + 0.8vw);
        font-family: "KoPub Batang", serif;
        font-size: calc(0.42rem + 0.4vw);
        line-height: calc(13px + 0.8vw);
        color: #a3adb9;
        opacity: 0;
        transform: translate3d(0px, 100%, 0px);
        animation: 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 1.5s y100;
        .strong {
          font-family: trump-gothic-pro;
          color: #fff;
          font-size: 1.4rem;
          letter-spacing: 2px;
        }
      }
    }
  }
  ul {
    position: absolute;
    top: 170px;
    right: 74px;
    width: calc(100vh - 220px);
    display: flex;
    justify-content: space-between;
    font-family: trump-gothic-pro;
    font-size: calc(0.42rem + 0.42vw);
    color: #fff;
    letter-spacing: 2px;
    box-sizing: border-box;
    transform-origin: top right;
    transform: rotate(90deg) translate3d(100%, 0, 0);
    overflow: hidden;
    li {
      transform: translate3d(0px, 100%, 0px);
      animation: 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 2.8s y100;
    }
  }
  .update {
    position: absolute;
    bottom: 50px;
    left: 50px;
    line-height: 0;
    overflow: hidden;
    span {
      display: inline-block;
      font-family: trump-gothic-pro;
      transform: translate3d(0px, 100%, 0px);
      animation: 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 2.8s y100;
      &:nth-child(1) {
        font-size: calc(0.35rem + 0.35vw);
        line-height: calc(0.35rem + 0.35vw);
        letter-spacing: 1.4px;
        color: #a3adb9;
      }
      &:nth-child(2) {
        font-size: calc(0.42rem + 0.42vw);
        line-height: calc(0.42rem + 0.42vw);
        letter-spacing: 2px;
        color: #fff;
      }
    }
  }
`;

const Home = () => {
  useEffect(() => {
    const header = document.getElementsByTagName("header");
    header[0].classList.add("home");
    return () => {
      header[0].classList.remove("home");
    };
  });

  return (
    <HomeBlock>
      <div className="textWrap">
        <h2>
          <img src="/images/jar.svg" alt="JAR" />
        </h2>
        <div className="pTxt">
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
      <ul>
        <li>PORTFOLIOS → 52</li>
        <li>DESIGN → 23</li>
        <li>LAST UPDATE → AUGUST 2020</li>
      </ul>
      <div className="update">
        <span>LAST UPDATE:</span>
        <span>&nbsp;AUGUST 2020</span>
      </div>
    </HomeBlock>
  );
};

export default Home;
