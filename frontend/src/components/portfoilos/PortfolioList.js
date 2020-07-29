import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import ImageList from "./../common/ImageList";
import Responsive from "./../common/Responsive";

const PortfolioListBlock = styled.div`
  padding: 4rem 0 10rem;
  .writeButtonArea {
    overflow: hidden;
    a {
      float: right;
      margin-right: 0;
    }
  }
  ul {
    margin: 0.5rem -2rem 5rem 0;
    align-items: center;
    justify-content: center;
    > li {
      display: inline-block;
      vertical-align: middle;
      padding: 2rem;
      width: 50%;
      line-height: 0;
      opacity: 0;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
      &.appear {
        opacity: 1;
      }
      a {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        border: 1px solid #e2e2e2;
        &:after {
          content: "";
          display: block;
          height: 0;
          padding-bottom: 50%;
        }
        .barcodeTxt {
          position: absolute;
          left: -34%;
          top: -68.5%;
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          font-family: "LibreBarcode128Text-Regular";
          font-size: 1.8rem;
          line-height: 3rem;
          color: #ffffffeb;
          letter-spacing: -0.5px;
          text-align: center;
          transform: rotate(-45deg);
          z-index: 1;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #364f611a;
            z-index: -1;
          }
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
        }
        .listText {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          padding: 3.5rem 2rem 2rem 2rem;
          h3 {
            position: relative;
            display: inline-block;
            font-family: "goku";
            font-size: 3rem;
            line-height: 3.1rem;
            color: #354e60;
            font-weight: 400;
            letter-spacing: -1px;
            :after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -1.5rem;
              width: 50%;
              height: 3px;
              background: #354e60;
            }
          }
          h4 {
            margin-top: 3rem;
            font-family: "KoPub Batang", serif;
            font-size: 1em;
            line-height: 2rem;
            color: #354e60;
          }
          span {
            position: absolute;
            right: 4rem;
            bottom: 3rem;
            width: 50%;
            text-align: center;
            font-family: "trump-gothic-pro";
            font-size: 1rem;
            line-height: 2.5em;
            color: #181829;
            letter-spacing: 2px;
            background: #fff;
            border: 1px solid;
            border-image-slice: 1;
            border-image-source: -webkit-linear-gradient(
              -90deg,
              #fd000077,
              #ed193177,
              #fd0c6877,
              #cb018f77
            );
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
        <ul className="portfolioList">
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
