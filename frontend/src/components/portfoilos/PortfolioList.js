import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import ImageList from "./../common/ImageList";
import Responsive from "./../common/Responsive";

const PortfolioListBlock = styled.div`
  padding: 4rem 0 10rem;
  min-height: 500px;
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
            <ImageList
              key={list._id}
              id={list.id}
              client={list.client}
              web={list.web}
              singlePage={list.singlePage}
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
