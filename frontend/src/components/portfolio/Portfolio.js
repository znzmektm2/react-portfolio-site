import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Responsive from "./../common/Responsive";
import useIO from "./../../lib/useIO";
import Image from "./../common/Image";

const PortfolioBlock = styled.div`
  @keyframes width100 {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes height100 {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }

  @keyframes y100 {
    0% {
      transform: translate3d(0px, 100%, 0px);
    }
    100% {
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

  .intro {
    overflow: hidden;
    .half {
      position: relative;
      display: flex;
      width: 50%;
      height: 100vh;
      float: left;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;

      /* 인트로 텍스트 박스 */
      &.introTxt {
        padding: 9rem 0 9rem 4.6rem;
        .lineBox {
          position: relative;
          padding: 0 6rem;
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          .line {
            position: absolute;
            background: #e2e2e2;
            animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.6s
              width100;
            &.step1 {
              top: 0;
              right: 0;
              height: 1px;
            }
            &.step2 {
              top: 0;
              left: 0;
              width: 1px;
              animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.6s
                height100;
            }
            &.step3 {
              bottom: 0;
              left: 0;
              height: 1px;
            }
          }
          .txtWrap {
            width: 100%;
            h2 {
              position: relative;
              padding-bottom: 2.8rem;
              overflow: hidden;
              .wrap {
                display: inline-block;
                overflow: hidden;
                span {
                  display: inline-block;
                  font-size: 6rem;
                  line-height: 1.1em;
                  font-weight: 400;
                  letter-spacing: -1px;
                  cursor: pointer;
                  transform: translate3d(0px, 100%, 0px);
                  animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards
                    0.6s y100;
                }
              }

              &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 30%;
                height: 0.35rem;
                background: #373646;
                transform: translate3d(-100%, 0px, 0px);
                animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.6s
                  x-100;
              }
            }
            h3 {
              margin-top: 3em;
              overflow: hidden;
              a {
                font-family: "KoPub Batang", serif;
                font-size: 1.1em;
                line-height: 1.5em;
                color: #454545;
                cursor: pointer;
                transform: translate3d(0px, 100%, 0px);
                animation: 1.1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 1s
                  y100;
              }
            }
          }
          .detailList {
            margin-top: 2rem;
            overflow: hidden;
            ul {
              overflow: hidden;
              transform: translate3d(0px, 100%, 0px);
              animation: 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 1.1s
                y100;

              li {
                margin-top: 1em;
                padding-right: 1rem;
                width: 33.333%;
                float: left;
                line-height: 1.2rem;
                font-size: 1rem;
                font-family: "trump-gothic-pro";
                letter-spacing: 0.07rem;

                &:nth-child(3n + 1) {
                  clear: both;
                }
                span {
                  display: block;
                  color: #454545;

                  &:nth-child(2) {
                    font-family: "KoPub Batang";
                    font-size: 0.9rem;
                    color: #b1b1b1;
                    letter-spacing: -0.01rem;
                  }
                }
                a {
                  margin-right: 5px;
                  display: inline-block;
                  margin-right: 20px;
                  color: #6ea4b9;
                  border-bottom: 1px solid #6ea4b9;
                }
                img {
                  margin-top: 10px;
                }
              }
            }
          }
        }
      }

      /* 인트로 이미지 박스 */
      &.introImg {
        a {
          img {
            opacity: 0;
            transform: translate3d(20%, 0, 0);
            width: 380px;
            box-shadow: 45px 45px 0px #fff;
            cursor: pointer;
            animation: 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.2s
              fadeIn;
            @keyframes fadeIn {
              0% {
                transform: translate3d(20%, 0, 0);
                opacity: 0;
              }
              100% {
                transform: translate3d(0%, 0, 0);
                opacity: 1;
              }
            }
          }
        }
        .bg {
          position: absolute;
          top: -5vh;
          right: -5vh;
          width: 110vh;
          height: 110vh;
          z-index: -1;
          @keyframes appear {
            0% {
              transform: translate3d(100%, 0, 0);
              opacity: 0;
            }
            100% {
              transform: translate3d(0%, 0, 0);
              opacity: 1;
            }
          }
          animation: 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) appear;
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.7;
          }
          svg {
            width: 100%;
            height: 100%;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .contentBox {
    background: #f5f5f7;
    .resposiveBlock {
      padding-top: 9rem;
      padding-bottom: 9rem;
      text-align: center;
      .buttonBox {
        text-align: left;
        a {
          margin: 0 1rem 0 0;
          font-size: 0.9rem;
        }
        button {
          margin: 0 1rem 0 0;
          font-size: 0.9rem;
        }
      }

      img {
        margin: 2rem auto 0;
        display: block;
        opacity: 0;
        transform: translate3d(0, 200px, 0);
        &.appear {
          animation: 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards fadeIn;
          @keyframes fadeIn {
            0% {
              transform: translate3d(0, 200px, 0);
              opacity: 0;
            }
            100% {
              transform: translate3d(0, 0, 0);
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

const Portfolio = ({ portfolio, error, loading, user, onEdit, onRemove }) => {
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });

  useEffect(() => {
    if (!loading && portfolio) {
      let img = document.getElementsByClassName("lazy");
      setElements(img);
    }
  }, [loading, portfolio, setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImage.classList.add("appear");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  // 에러 발생시
  if (error) {
    if (error.response && error.response.status === 404) {
      console.log(error.response);
      return <div>존재하지 않는 포트폴리오 입니다.</div>;
    }
  }

  // 로딩중이거나, 아직 데이터가 없을 시
  if (loading || !portfolio) {
    return null;
  }

  const {
    id,
    client,
    host,
    web,
    singlePage,
    pcVer,
    mobileVer,
    responsiveWeb,
    IEVersion,
    skill,
    workYear,
    workMonth,
    period,
    worker,
    url,
    thumbImage,
    contentImage,
  } = portfolio;

  const skillArray = skill.join(", ");
  const insertTag = (host) => (
    <li>
      <span>HOST</span>
      <span>{host}</span>
    </li>
  );

  return (
    <PortfolioBlock>
      <div className="intro">
        <div className="half introTxt">
          <div className="lineBox">
            <span className="line step1" />
            <span className="line step2" />
            <span className="line step3" />
            <div className="txtWrap">
              <h2>
                <a
                  className="wrap"
                  href={url[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{id}</span>
                </a>
              </h2>
              <h3>
                <a href={url[0]} target="_blank" rel="noopener noreferrer">
                  {client}
                </a>
              </h3>
              <div className="detailList">
                <ul>
                  {host && insertTag(host)}
                  <li>
                    <span>TYPE</span>
                    <span>
                      {web && "Web"}
                      {singlePage && "SinglePage"}
                    </span>
                  </li>
                  <li>
                    <span>VERSION</span>
                    <span>
                      {pcVer ? (mobileVer ? "PC / Mobile" : "PC") : "Mobile"}
                      {responsiveWeb && " / 반응형"}
                    </span>
                  </li>
                  <li>
                    <span>IE VERSION</span>
                    <span>{IEVersion}</span>
                  </li>
                  <li>
                    <span>WHEN</span>
                    <span>
                      {workYear} {workMonth}
                    </span>
                  </li>
                  <li>
                    <span>PERIOD</span>
                    <span>{period}</span>
                  </li>
                  <li>
                    <span>WORKER</span>
                    <span>{worker}</span>
                  </li>
                  <li>
                    <span>SKILL</span>
                    <span>{skillArray}</span>
                  </li>
                  <li>
                    <span>URL</span>
                    {url.map((u) => {
                      return (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={u}
                          key={u}
                        >
                          {u}
                        </a>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="half introImg">
          <a href={url[0]} target="_blank" rel="noopener noreferrer">
            <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
          </a>
          <span className="bg">
            <svg>
              <defs>
                <filter id="filter">
                  <feGaussianBlur stdDeviation="12" />
                </filter>
              </defs>
              <image
                href={`../${thumbImage.url}`}
                width="100%"
                height="100%"
                filter="url(#filter)"
                alt={thumbImage.name}
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="contentBox">
        <Responsive>
          {user && (
            <div className="buttonBox">
              <Button onClick={onEdit}>수정</Button>
              <Button onClick={onRemove}>삭제</Button>
              <Button to="/portfolios">리스트로 가기</Button>
            </div>
          )}
          {contentImage.map((contImg) => (
            <Image
              key={contImg.url}
              src={`../${contImg.url}`}
              alt={contImg.name}
              isLazy
            />
          ))}
        </Responsive>
      </div>
    </PortfolioBlock>
  );
};

export default Portfolio;
