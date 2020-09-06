import React from "react";
import "./PortfolioList.scss";
import Image from "./../../common/Image";
import { DelayLink } from "./../../common/DelayLink";

const PortfolioList = ({
  portfolioList,
  portfoliosError,
  portfolioLoading,
  user,
}) => {
  if (portfoliosError) {
    return (
      <div className="portfolioListBlock">
        <div className="wrap">에러가 발생했습니다.</div>
      </div>
    );
  }

  if (!portfolioList.length) {
    // 로딩중이면서 포트폴리오가 없을 시
    if (portfolioLoading) {
      return <div className="portfolioListBlock" />;
    }
    // 로딩중이 아니면서 포트폴리오가 없을 시
    if (!portfolioLoading) {
      return (
        <div className="portfolioListBlock">
          <div className="wrap">
            {user && (
              <div className="writeButtonArea">
                <DelayLink
                  to="/writePortfolio"
                  open="true"
                  className="writeBtn"
                >
                  새 글 작성하기
                </DelayLink>
              </div>
            )}
            <p>데이터가 없습니다.</p>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="portfolioListBlock">
      <div className="wrap">
        {user && (
          <div className="writeButtonArea">
            <DelayLink to="/writePortfolio" open="true" className="writeBtn">
              새 글 작성하기
            </DelayLink>
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
                <div className="textBox">
                  <div className="textWrap">
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
        <div className="bottomTarget" />
      </div>
    </div>
  );
};

export default PortfolioList;
