import React, { forwardRef, useEffect } from "react";

import styled from "styled-components";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import ImageList from "./../common/ImageList";

const PortfolioListBlock = styled.div`
  padding: 2rem 0 10rem;
  .pageWrapper {
    margin: 0 auto;
    width: 1200px;
  }
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
      width: 33.33%;
      height: 410.63px;
      overflow: hidden;
      box-sizing: border-box;
      opacity: 0;
      -webkit-transition: all 0.7s ease-in-out;
      -moz-transition: all 0.7s ease-in-out;
      -o-transition: all 0.7s ease-in-out;
      transition: all 0.7s ease-in-out;
      &.appear {
        opacity: 1;
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
  const { portfolioList, portfoliosError, loading, user, listLoading } = props;

  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });

  useEffect(() => {
    if (portfolioList.length) {
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

  // 로딩중이거나, 아직 데이터가 없을 시
  if (loading || !portfolioList) {
    return null;
  }

  return (
    <PortfolioListBlock>
      <div className="pageWrapper">
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
        {/* {listLoading && <div>로딩중 입니다..</div>} */}
      </div>
      <div ref={ref} />
    </PortfolioListBlock>
  );
});

export default PortfolioList;
