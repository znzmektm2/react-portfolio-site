import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AboutBlock = styled.div`
  article {
    position: relative;
    padding: 9.5rem 4.6rem 4.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    border-bottom: 1px solid #000;
    box-sizing: border-box;

    h2 {
      position: relative;
      font-size: calc(3rem + 3vw);
      line-height: 1.4em;
      letter-spacing: -0.01em;
    }

    &.intro {
      padding: 0;
      overflow: hidden;
      .bg {
        position: fixed;
        top: 0;
        left: -10%;
        width: 120%;
        height: 120%;
        background: #000308;
        z-index: -1;
        &:before {
          content: "";
          display: block;
          height: 100%;
          background: url(/images/about.jpg) bottom right no-repeat;
          background-size: cover;
          opacity: 0.2;
        }
      }

      h2 {
        color: #fff;
      }
      ul {
        li {
          color: #fff;
        }
      }
    }

    &.skills {
      background: #fff;
    }
    &.recongition {
      position: relative;
      background: #0d0e13;
      h2 {
        position: absolute;
        left: 0;
        top: 5rem;
        width: 100%;
        text-align: center;
        display: inline-block;
        span {
          padding: 0 2vw;
          color: #fff;
          background: #0d0e13;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        border: 1px solid #42390f;
        .lists {
          margin: 0 auto;
          width: 80%;
          max-width: 1300px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          li {
            padding: 8vh 4.5vw 0;
          }
        }
      }
    }
  }
`;

const About = () => {
  // const toLink = (e) => {
  //   e.preventDefault();
  //   window.open(url, "_blank");
  // };

  return (
    <AboutBlock>
      <article className="intro">
        <div className="bg" />
        <h2>
          <img src="/images/aeranjeon.svg" alt="aeranjeon" />
        </h2>
        <ul>
          <li>전애란 / Ae Ran Jeon.</li>
          <li>+82 10-6224-7367</li>
          <li>sierrajeon@gmail.com</li>
        </ul>
      </article>
      <article className="skills">
        <h2>Clients</h2>
      </article>
      <article className="recongition">
        <h2>
          <span>Recognition</span>
        </h2>
        <div className="content">
          <ul className="lists">
            <li>
              <Link to="http://ccej.or.kr/">
                <img src="/images/wa_ccej.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="http://www.postech.ac.kr/">
                <img src="/images/wa_postech.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="http://www.kriso.re.kr/">
                <img src="/images/wa_kriso.png" alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </AboutBlock>
  );
};

export default About;
