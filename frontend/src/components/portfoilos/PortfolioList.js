import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import Image from "./../common/Image";
import Responsive from "./../common/Responsive";
import { DelayLink } from "./../common/DelayLink";

const PortfolioListBlock = styled.div`
  padding: 4rem 0 10rem;
  min-height: 500px;
  background: #fff;
  .writeButtonArea {
    overflow: hidden;
    a {
      float: right;
      margin-right: 0;
    }
  }
  ul {
    margin: 1rem -1rem;
    align-items: center;
    justify-content: center;
    li {
      display: inline-block;
      vertical-align: middle;
      padding: 1rem;
      width: 25%;
      line-height: 0;
      opacity: 0;
      box-sizing: border-box;
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
      &.appear {
        opacity: 1;
      }

      a {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        overflow: hidden;
        &:after {
          content: "";
          display: block;
          height: 0;
          padding-bottom: 100%;
        }
        .imgBox {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          img {
            width: 100%;
          }
        }
        .txtBox {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          padding: 3rem 2rem;
          &:before {
            content: "";
            position: absolute;
            top: -1px;
            left: -1px;
            width: 101%;
            height: 0;
            background: #000506;
            opacity: 0.85;
          }
          .wrap {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
            .type {
              margin-bottom: 0.7rem;
              display: block;
              overflow: hidden;
              span {
                display: inline-block;
                font-family: trump-gothic-pro;
                font-size: 1.1rem;
                line-height: 1.1rem;
                color: #c8c9b9;
                letter-spacing: 1.3px;
                opacity: 0;
                transform: translate3d(0, -100%, 0);
              }
            }
            h3 {
              position: relative;
              display: inline-block;
              padding-bottom: 2.2rem;
              overflow: hidden;
              :after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 4rem;
                height: 3px;
                background: #c8c9b9;
                transform: translate3d(-100%, 0, 0);
              }
              span {
                display: inline-block;
                font-family: "goku";
                font-size: 3.2rem;
                line-height: 3.5rem;
                color: #c8c9b9;
                font-weight: 400;
                letter-spacing: -1px;
                opacity: 0;
                transform: translate3d(0, -100%, 0);
              }
            }
            h4 {
              margin-top: 1rem;
              display: inline-block;
              overflow: hidden;
              span {
                display: inline-block;
                font-family: "KoPub Batang", serif;
                font-size: 1em;
                line-height: 2rem;
                color: #c8c9b9;
                opacity: 0;
                transform: translate3d(0, -100%, 0);
              }
            }
          }
        }
        &:hover {
          .txtBox {
            &:before {
              height: 101%;
              transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
            }
            .type {
              span {
                opacity: 1;
                transform: translate3d(0, 0%, 0);
                transition: transform 0.5s ease;
              }
            }
            h3 {
              span {
                opacity: 1;
                transform: translate3d(0, 0%, 0);
                transition: transform 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
              }
              &:after {
                transform: translate3d(0%, 0, 0);
                transition: transform 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
              }
            }
            h4 {
              span {
                opacity: 1;
                transform: translate3d(0, 0%, 0);
                transition: transform 0.5s ease;
              }
            }
          }
        }
      }
    }
  }
`;

const PortfolioList = forwardRef((props, ref) => {
  const { portfolioList, portfoliosError, portfolioLoading, user } = props;

  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });

  useEffect(() => {
    if (!portfolioLoading && portfolioList) {
      let img = Array.from(document.getElementsByClassName("lazy"));
      setElements(img);
    }
  }, [portfolioLoading, portfolioList, setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImage.parentNode.parentNode.parentNode.classList.add("appear");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  if (portfoliosError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!portfolioList.length) {
    // 로딩중이면서 포트폴리오가 없을 시
    if (portfolioLoading) {
      return <PortfolioListBlock />;
    }
    // 로딩중이 아니면서 포트폴리오가 없을 시
    if (!portfolioLoading) {
      return <PortfolioListBlock>데이터가 없습니다.</PortfolioListBlock>;
    }
  }

  return (
    <PortfolioListBlock>
      <Responsive>
        {user && (
          <div className="writeButtonArea">
            <Button to="/write">새 글 작성하기</Button>
          </div>
        )}
        <ul className="portfolioList">
          {portfolioList.map((list) => (
            <li key={list._id}>
              <DelayLink to={`/portfolio/${list.id}`} open="true">
                <div className="imgBox">
                  <Image
                    src={list.thumbImage.url}
                    alt={list.thumbImage.name}
                    isLazy
                  />
                </div>
                <div className="txtBox">
                  <div className="wrap">
                    <div className="type">
                      <span>
                        {list.web && "WEB"}
                        {list.singlePage && "SINGLEPAGE"}
                      </span>
                    </div>
                    <h3>
                      <span>{list.id}</span>
                    </h3>
                    <h4>
                      <span>{list.client}</span>
                    </h4>
                  </div>
                </div>
              </DelayLink>
            </li>
          ))}
        </ul>
        <div ref={ref} />
      </Responsive>
    </PortfolioListBlock>
  );
});

export default PortfolioList;
