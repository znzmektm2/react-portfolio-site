import React, { useEffect } from "react";
import "./About.scss";
import useIO from "./../../../lib/useIO";
import introUseIO from "./../../../lib/useIO";
import ClientsContainer from "./../../../containers/about/ClientsContainer";

const About = () => {
  const [observer, setElements, entries] = useIO({
    threshold: 0.3,
    root: null,
  });
  const [, setIntroElement, introEntry] = introUseIO({
    threshold: 0,
    root: null,
    rootMargin: "10%",
  });

  // 스크롤 이벤트
  const scrollEvent = () => {
    const scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    const windowHeight = window.innerHeight; // 스크린 창
    const margin = windowHeight / 11;

    const header = document.getElementsByTagName("header")[0];

    const intro = document.getElementsByClassName("intro")[0];
    const introOffsetTop = intro.offsetTop;
    const introOffsetBottom = introOffsetTop + intro.offsetHeight;

    const recongition = document.getElementsByClassName("recongition")[0];
    const recongitionOffsetTop = recongition.offsetTop;
    const recongitionOffsetBottom =
      recongitionOffsetTop + recongition.offsetHeight;

    // 인트로 진입시 로고 밑 메뉴버튼 색 바꾸기
    if (
      scrollLocation >= introOffsetTop - margin &&
      scrollLocation <= introOffsetBottom - margin
    ) {
      header.classList.add("effective");
      header.classList.add("scroll");
    }
    // Recognition 진입시 로고 밑 메뉴버튼 색 바꾸기
    else if (
      scrollLocation >= recongitionOffsetTop - margin &&
      scrollLocation <= recongitionOffsetBottom - margin
    ) {
      header.classList.add("effective");
      header.classList.add("scroll");
    }
    // 타겟 지점이 아닌 경우
    else {
      header.classList.remove("scroll");
    }
  };

  useEffect(() => {
    // IntersectionObserver 타겟 관리
    const introLi = document.querySelectorAll(".intro .content ul li");
    const clientsList = document.getElementsByClassName("clientsList");
    const recongitionUl = document.querySelectorAll(".recongition .lists");
    const array = [...introLi, ...clientsList, ...recongitionUl];
    setElements(array);

    const intro = document.querySelectorAll(".intro");
    setIntroElement([...intro]);

    // 스크롤 이벤트 적용
    scrollEvent();
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [setElements, setIntroElement]);

  useEffect(() => {
    // 타겟 노출시 이벤트
    const clientsListLi = document.querySelectorAll(".clientsList ul li");
    entries.forEach((entry) => {
      const target = entry.target;
      if (entry.isIntersecting) {
        if (target.className === "clientsList") {
          for (let i = 0; i < clientsListLi.length; i++) {
            setTimeout(() => {
              clientsListLi[i].classList.add("active");
            }, 25 * i);
          }
          return;
        }
        target.classList.add("active");
        observer.unobserve(target);
      }
    });

    // .intro 노출시 이벤트
    introEntry.forEach((entry) => {
      const target = entry.target;
      if (entry.isIntersecting) {
        target.classList.add("active");
      } else {
        target.classList.remove("active");
      }
    });
  }, [entries, introEntry, observer]);

  return (
    <div className="aboutBlock">
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
          <div className="imgWrap">
            <img
              src="/images/about.jpg"
              alt="about"
            />
          </div>
        </div>
      </article>
      <ClientsContainer />
      <article className="recongition">
        <div className="content">
          <h2>
            <span>Recognition</span>
          </h2>
          <ul className="lists">
            <li>
              <a href="http://ccej.or.kr/" target="_blank" rel="noopener noreferrer">
                <img src="/images/wa_ccej.png" alt="WA 비영리기관분야 경실련 최우수상" />
              </a>
            </li>
            <li>
              <a href="http://www.postech.ac.kr/" target="_blank" rel="noopener noreferrer">
                <img src="/images/wa_postech.png" alt="WA 대학분야 포항공과대학교 최우수상" />
              </a>
            </li>
            <li>
              <a href="http://www.kriso.re.kr/" target="_blank" rel="noopener noreferrer">
                <img src="/images/wa_kriso.png" alt="WA 연구기관분야 선박해양플랜트연구소 우수상" />
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};

export default About;
