import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useIO from "./../../lib/useIO";
import introUseIO from "./../../lib/useIO";

const AboutBlock = styled.div`
  @keyframes y-100 {
    0% {
      transform: translateY(70%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  article {
    position: relative;
    padding: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    border-bottom: 1px solid #000;
    box-sizing: border-box;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 9rem 4rem 4rem;
      width: 100%;
      height: 100%;
      overflow: hidden;
      h2 {
        position: absolute;
        top: 5.5vh;
        left: 0;
        width: 100%;
        font-size: calc(3.5rem + 3vw);
        line-height: 1.4em;
        letter-spacing: -0.01em;
        text-align: center;
        span {
          display: inline-block;
          padding: 0 2vw;
        }
      }
    }

    &.intro {
      overflow: hidden;
      h2 {
        top: 14vh;
        color: #fff;
      }
      .content {
        padding: 30vh 4vw 0;
        border: 1px solid #46454d;
        ul {
          width: 100%;
          height: 100%;
          text-align: center;
          li {
            display: inline-block;
            vertical-align: top;
            max-width: 33.333%;
            padding: 0 3rem;
            color: #fff;
            text-align: left;
            h3 {
              margin-bottom: 1rem;
              font-family: trump-gothic-pro;
              font-size: calc(0.7rem + 0.6vw);
              letter-spacing: 1.6px;
              overflow: hidden;
              span {
                display: inline-block;
                transform: translate3d(0, 105%, 0);
              }
            }
            .introText {
              overflow: hidden;
              .wrap {
                transform: translate3d(0, 105%, 0);
                div {
                  margin-bottom: 1rem;
                }
              }
            }
            p {
              font-family: "KoPub Batang", serif;
              font-size: 0.96rem;
              color: #a7a7a7;
              span {
                color: #ff1f44;
              }
            }
            &.active {
              h3 {
                span {
                  transform: translate3d(0, 0%, 0);
                  transition: 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
                }
              }
              .introText {
                .wrap {
                  transform: translate3d(0, 0%, 0);
                  transition: 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
                }
              }
            }
          }
        }
      }

      .bg {
        position: absolute;
        top: 0;
        left: -10%;
        width: 120%;
        height: 120%;
        background: #000308;
        z-index: -1;
        img {
          width: 100%;
          opacity: 0.2;
        }
      }

      &.active {
        .bg {
          position: fixed;
        }
      }
    }

    &.clients {
      background: #fff;
      h2 {
        span {
          color: #222;
          background: #fff;
        }
      }
      .content {
        border: 1px solid #222;
        .clientsList {
          width: 96%;
          height: 100%;
          overflow: hidden;
          ul {
            transform: translateY(70%);
            text-align: left;
            li {
              margin-bottom: 1.1rem;
              width: 16.666%;
              display: inline-block;
              font-size: 0;
              line-height: 0;
              text-align: center;
              a {
                width: 94%;
              }
            }
          }

          &.active {
            ul {
              animation: 15s linear infinite y-100;
              &:hover {
                animation-play-state: paused;
              }
            }
          }
        }
      }
    }
    &.recongition {
      position: relative;
      background: #0d0e13;
      h2 {
        span {
          color: #fff;
          background: #0d0e13;
        }
      }
      .content {
        border: 1px solid #42390f;
        .lists {
          width: 84%;
          display: flex;
          justify-content: center;
          li {
            padding: 13vh 4.8vw 0;
            line-height: 0;
            overflow: hidden;
            img {
              opacity: 0;
              width: 100%;
              transform: translate3d(0, 20%, 0);
            }
          }
          &.active {
            li {
              img {
                opacity: 1;
                transform: translate3d(0, 0%, 0);
                transition: 1.2s cubic-bezier(0.76, 0, 0.24, 1);
              }
              &:nth-child(2) {
                img {
                  transition: 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.3s;
                }
              }
              &:nth-child(3) {
                img {
                  transition: 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.6s;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const About = () => {
  const [observer, setElements, entries] = useIO({
    threshold: 0.3,
    root: null,
  });
  const [, setIntroElement, introEntry] = introUseIO({
    threshold: 0,
    root: null,
  });

  // const [top, setTop] = useState("0%");
  // const [opacity, setOpacity] = useState("0.2");

  const scrollEvent = () => {
    const scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    const windowHeight = window.innerHeight; // 스크린 창
    const margin = windowHeight / 11;

    const intro = document.getElementsByClassName("intro")[0];
    const introOffsetTop = intro.offsetTop;
    const introOffsetBottom = introOffsetTop + intro.offsetHeight;

    const recongition = document.getElementsByClassName("recongition")[0];
    const recongitionOffsetTop = recongition.offsetTop;
    const recongitionOffsetBottom =
      recongitionOffsetTop + recongition.offsetHeight;

    const header = document.getElementsByTagName("header")[0];

    // 인트로 진입시 로고 밑 메뉴버튼 색 바꾸기
    if (
      scrollLocation >= introOffsetTop - margin &&
      scrollLocation <= introOffsetBottom - margin
    ) {
      header.classList.add("scroll");
      header.classList.add("effective");
    }
    // Recognition 진입시 로고 밑 메뉴버튼 색 바꾸기
    else if (
      scrollLocation >= recongitionOffsetTop - margin &&
      scrollLocation <= recongitionOffsetBottom - margin
    ) {
      header.classList.add("effective");
      header.classList.add("scroll");
    } else {
      header.classList.remove("effective");
      header.classList.remove("scroll");
    }

    // setTop(-(scrollLocation * 0.018) + "%");
    // setOpacity(0.35 - scrollLocation * 0.0002);
  };

  const ieMouseWheelEvent = (e) => {
    e.preventDefault();
    const wheelDelta = e.deltaY;
    const currentScrollPosition = window.pageYOffset;
    window.scrollTo(0, currentScrollPosition + wheelDelta);
  };

  const ieOnKeyDownEvent = (e) => {
    e.preventDefault();
    const currentScrollPosition = window.pageYOffset;

    switch (e.which) {
      case 35: // End
        window.scrollTo(0, document.body.scrollHeight);
        break;
      case 36: // Home
        window.scrollTo(0, 0);
        break;
      case 38: // up
        window.scrollTo(0, currentScrollPosition - 120);
        break;
      case 40: // down
        window.scrollTo(0, currentScrollPosition + 120);
        break;
      case 116: // F5
        window.location.reload();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    // 스크롤 타겟 관리
    const introLi = document.querySelectorAll(".intro .content ul li");
    const clientsList = document.getElementsByClassName("clientsList");
    const recongitionUl = document.querySelectorAll(".recongition .lists");
    const array = [...introLi, ...clientsList, ...recongitionUl];
    setElements(array);

    const intro = document.querySelectorAll(".intro");
    setIntroElement([...intro]);

    // 스크롤 이벤트
    scrollEvent();
    window.addEventListener("scroll", scrollEvent);

    // position: fixed 사용시 ie 떨림 현상 방지
    const body = document.getElementsByTagName("body")[0];
    if (navigator.userAgent.match(/Trident\/7\./)) {
      body.addEventListener("wheel", ieMouseWheelEvent);
      body.onkeydown = ieOnKeyDownEvent;
    }

    return () => {
      window.removeEventListener("scroll", scrollEvent);

      if (navigator.userAgent.match(/Trident\/7\./)) {
        body.removeEventListener("wheel", ieMouseWheelEvent);
        body.onkeydown = null;
      }
    };
  }, [setElements, setIntroElement]);

  useEffect(() => {
    // 타겟 노출시 이벤트
    entries.forEach((entry) => {
      let target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add("active");
        observer.unobserve(target);
      }
    });

    // .intro 노출시 이벤트
    introEntry.forEach((entry) => {
      let target = entry.target;
      if (entry.isIntersecting) {
        target.classList.add("active");
      } else {
        target.classList.remove("active");
      }
    });
  }, [entries, introEntry, observer]);

  return (
    <AboutBlock>
      <article className="intro">
        <div className="content">
          <h2>
            <span>Aeran Jeon.</span>
          </h2>
          <ul>
            <li>
              <h3>
                <span>INFORMATION</span>
              </h3>
              <div className="introText">
                <div className="wrap">
                  <p>
                    <span>Name</span> 전애란
                  </p>
                  <p>
                    <span>Mobile</span> +82 10-6224-7367
                  </p>
                  <p>
                    <span>Adress</span> Yongin-si, Gyeonggi-do, Republic of
                    Korea
                  </p>
                  <p>
                    <span>Email</span> sierrajeon@gmail.com
                  </p>
                  <p>
                    <span>Intro</span> 독학으로 시작한 웹사이트 제작 경험을
                    기반으로 프론트엔드 부터 백엔드까지 차근차근 과정을 밟아
                    왔습니다. 흥미로운 애니메이션과 인터렉션에 재미를 느끼며,
                    최근에는 자바스크립트와 리액트에 관심이 많습니다.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <h3>
                <span>SKILL EXPERIENCE</span>
              </h3>
              <div className="introText">
                <div className="wrap">
                  <p>
                    <span>Language</span> HTML5, CSS3, SCSS, JavaScript, jQuery,
                    Java
                  </p>
                  <p>
                    <span>Front Library</span> React
                  </p>
                  <p>
                    <span>Server</span> Node.js, Apache Tomcat 8.5
                  </p>
                  <p>
                    <span>DataBase</span> MongoDB, Oracle Database
                  </p>
                  <p>
                    <span>Framework</span> Spring Framework 4.x, MyBatis 3.x
                  </p>
                  <p>
                    <span>Web Editor</span> WordPress, XpressEngine, Namo
                    WebEditor
                  </p>
                  <p>
                    <span>Configuration Management</span> Git &amp; Github, SVN
                  </p>
                  <p>
                    <span>IDE</span> Visual Studio Code, Eclipse, Brackets,
                    EditPlus
                  </p>
                </div>
              </div>
            </li>
            <li>
              <h3>
                <span>EDUCATION</span>
              </h3>
              <div className="introText">
                <div className="wrap">
                  <div>
                    <p>
                      <span>Period</span> 2019.04.29 ~ 2019.08.29
                    </p>
                    <p>
                      <span>Major</span> MSA(Microservice Architecture)
                      <br /> 실습 프로젝트 활용 SW인력 양성과정
                    </p>
                    <p>
                      <span>Training Center</span> 판교 한국소프트웨어기술훈련원
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>Period</span> 2017.04.21 ~ 2017.06.21
                    </p>
                    <p>
                      <span>Major</span> UI제작 향상(자바스크립트,제이쿼리)
                    </p>
                    <p>
                      <span>Training Center</span> 강남 이젠아카데미컴퓨터학원
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>Period</span> 2015.04.01 ~ 2015.08.14
                    </p>
                    <p>
                      <span>Major</span> 디지털디자인B
                    </p>
                    <p>
                      <span>Training Center</span> 강남 하이미디어컴퓨터학원
                    </p>
                    <p>
                      <span>Period</span> 2013.01.07 ~ 2013.01.30
                    </p>
                    <p>
                      <span>Major</span> FLASH(5교시)
                    </p>
                    <p>
                      <span>Training Center</span> 강남 그린컴퓨터아트학원
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg">
          <img
            src="/images/about.jpg"
            alt="about"
            // style={{ opacity: opacity, marginTop: top }}
          />
        </div>
      </article>
      <article className="clients">
        <div className="content">
          <h2>
            <span>Clients</span>
          </h2>
          <div className="clientsList">
            <ul>
              <li>
                <a
                  href="http://fn.hackers.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_fn_hackers.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.hackersut.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_hackersut.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://asan-nanum.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_asan_nanum.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://cse.postech.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_cse_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://ee.postech.ac.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_ee_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://ccej.or.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_ccej.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.kimikim.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_kimikim.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.korbi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_korbi.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.cimon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_cimon.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://metabrain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_metabrain.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.postechholdings.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_postechholdings.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="http://mot.unist.ac.kr/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/clients/p_mot_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://nov.ncc.re.kr/">
                  <img src="/images/clients/p_nov_ncc.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.postech.ac.kr/">
                  <img src="/images/clients/p_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://management.unist.ac.kr/">
                  <img src="/images/clients/p_management_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://unist-kor.unist.ac.kr/">
                  <img src="/images/clients/p_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.kriso.re.kr/">
                  <img src="/images/clients/p_kriso.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://lei.snu.ac.kr/">
                  <img src="/images/clients/p_language_snu.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://smile.seoul.kr/webzine">
                  <img src="/images/clients/p_smile_seoul_webzine.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://industry.unist.ac.kr/">
                  <img src="/images/clients/p_industry_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://vote.ccej.or.kr/">
                  <img src="/images/clients/p_vote_ccej.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://research.unist.ac.kr">
                  <img src="/images/clients/p_research_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://health.pulmuone.co.kr/">
                  <img src="/images/clients/p_health_pulmuone.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.nowpeople.co.kr/">
                  <img src="/images/clients/p_nowpeople.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://fn.hackers.com/">
                  <img src="/images/clients/p_fn_hackers.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.hackersut.com/">
                  <img src="/images/clients/p_hackersut.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://asan-nanum.org/">
                  <img src="/images/clients/p_asan_nanum.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://cse.postech.ac.kr/">
                  <img src="/images/clients/p_cse_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://ee.postech.ac.kr/">
                  <img src="/images/clients/p_ee_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://ccej.or.kr/">
                  <img src="/images/clients/p_ccej.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.kimikim.it/">
                  <img src="/images/clients/p_kimikim.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.korbi.com/">
                  <img src="/images/clients/p_korbi.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.cimon.com/">
                  <img src="/images/clients/p_cimon.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://metabrain.com/">
                  <img src="/images/clients/p_metabrain.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.postechholdings.com/">
                  <img src="/images/clients/p_postechholdings.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://mot.unist.ac.kr/en/">
                  <img src="/images/clients/p_mot_unist.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://nov.ncc.re.kr/">
                  <img src="/images/clients/p_nov_ncc.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://www.postech.ac.kr/">
                  <img src="/images/clients/p_postech.png" alt="" />
                </a>
              </li>
              <li>
                <a href="http://management.unist.ac.kr/">
                  <img src="/images/clients/p_management_unist.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <article className="recongition">
        <div className="content">
          <h2>
            <span>Recognition</span>
          </h2>
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
