import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Responsive from "./../common/Responsive";

const PortfolioBlock = styled.div`
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
          padding: 0 6rem;
          display: flex;
          align-items: center;
          margin-right: -1px;
          width: 100%;
          height: 100%;
          border: 1px solid #e2e2e2;
          .txtWrap {
            width: 100%;
            h2 {
              position: relative;
              font-size: 6rem;
              line-height: 1.1em;
              font-weight: 400;
              letter-spacing: -1px;
              overflow: hidden;
              &:after {
                content: "";
                display: block;
                margin-top: 2.8rem;
                width: 30%;
                height: 0.35rem;
                background: #222;
              }
              span {
                cursor: pointer;
              }
            }
            h3 {
              margin-top: 3em;
              font-family: "KoPub Batang", serif;
              font-size: 1.3em;
              line-height: 1.5em;
              color: #454545;
              overflow: hidden;

              span {
                cursor: pointer;
              }
            }
          }
          ul {
            margin-top: 2rem;
            overflow: hidden;
            li {
              margin-top: 1em;
              width: 33.333%;
              float: left;
              line-height: 1.2rem;
              font-size: 1rem;
              font-family: "trump-gothic-pro";
              letter-spacing: 0.07rem;
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

      /* 인트로 이미지 박스 */
      img {
        width: 380px;
        box-shadow: 45px 45px 0px #fff;
        cursor: pointer;
      }
      .bg {
        position: absolute;
        top: -5vh;
        right: -5vh;
        width: 110vh;
        height: 110vh;
        z-index: -1;
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
  .contentBox {
    background: #f5f5f7;
    .resposiveBlock {
      padding: 9rem 0;
      text-align: center;
      .buttonBox {
        text-align: left;
        a {
          margin: 0 1rem 0 0;
        }
        button {
          margin: 0 1rem 0 0;
        }
      }
    }
  }
`;

const Portfolio = ({ portfolio, error, loading, user, onEdit, onRemove }) => {
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
    animationEvent,
    workYear,
    workMonth,
    period,
    worker,
    url,
    thumbImage,
    contentImage,
  } = portfolio;

  const skillArray = skill.join(", ");
  const animationEventArray = animationEvent.join(", ");
  const insertTag = (host) => (
    <li>
      <span>HOST</span>
      <span>{host}</span>
    </li>
  );
  const toLink = () => {
    console.log(1);
    window.open(url[0], "_blank");
  };
  return (
    <div className="page">
      <PortfolioBlock>
        <div className="intro">
          <div className="half introTxt">
            <div className="lineBox">
              <div className="txtWrap">
                <h2>
                  <span onClick={toLink}>{id}</span>
                </h2>
                <h3>
                  <span onClick={toLink}>{client}</span>
                </h3>
                <ul>
                  {host !== "null" && insertTag(host)}
                  <li>
                    <span>TYPE</span>
                    <span>
                      {web && "Web"}
                      {singlePage && "singlePage"}
                    </span>
                  </li>
                  <li>
                    <span>VERSION</span>
                    <span>
                      {pcVer && "PC "}
                      {mobileVer && " / Mobile"}
                      {responsiveWeb && "반응형 웹"}
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
          <div className="half">
            <img
              src={`../${thumbImage.url}`}
              alt={thumbImage.name}
              onClick={toLink}
            />
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
                <Button to="/portfolios">리스트로 가기</Button>
                <Button onClick={onEdit}>수정</Button>
                <Button onClick={onRemove}>삭제</Button>
              </div>
            )}
            {contentImage.map((contImg) => (
              <img
                key={contImg.url}
                src={`../${contImg.url}`}
                alt={contImg.name}
              />
            ))}
          </Responsive>
        </div>
      </PortfolioBlock>
    </div>
  );
};

export default Portfolio;
