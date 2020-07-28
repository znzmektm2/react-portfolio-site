import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import ImageList from "./../common/ImageList";
import Responsive from "./../common/Responsive";

const PortfolioListBlock = styled.div`
  padding: 2rem 0 10rem;
  .writeButtonArea {
    overflow: hidden;
    a {
      float: right;
    }
  }
  ul {
    margin: 0.5rem -1rem 5rem;
    align-items: center;
    justify-content: center;
    li {
      display: inline-block;
      vertical-align: middle;
      padding: 1rem;
      width: 25%;
      height: 390.5px;
      overflow: hidden;
      box-sizing: border-box;
      opacity: 0;
      transform: translate(0px, 60px);
      -ms-transform: translate(0px, 60px);
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
      &.appear {
        opacity: 1;
        transform: translate(0px, 0px);
        -ms-transform: translate(0px, 0px);
      }
      a {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        line-height: 0;
        font-size: 0;
        span {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          font-size: 1.5rem;
          line-height: 5rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
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
    if (portfolioList) {
      let img = Array.from(document.getElementsByClassName("lazy"));
      setElements(img);
    }
  }, [portfolioList, setElements]);

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

  if (portfoliosError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!portfolioList.length) {
    // 로딩중이면서 포트폴리오가 없을 시
    if (portfolioLoading) {
      return null;
    }
    // 로딩중이 아니면서 포트폴리오가 없을 시
    if (!portfolioLoading) {
      return <div>데이터가 없습니다.</div>;
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

        <ul>
          {portfolioList.map((list) => (
            <ImageList
              key={list._id}
              id={list.id}
              client={list.client}
              src={list.thumbImage.url}
              isLazy
              alt={list.thumbImage.name}
            />
          ))}
        </ul>
        <div ref={ref} />
      </Responsive>
    </PortfolioListBlock>
  );
});

export default PortfolioList;
