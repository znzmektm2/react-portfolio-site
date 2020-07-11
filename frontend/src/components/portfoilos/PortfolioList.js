import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";

const PortfolioListBlock = styled.div`
  margin: 2rem 0;
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
    margin: 0.5rem -1rem;
    align-items: center;
    justify-content: center;
    li {
      display: inline-block;
      vertical-align: middle;
      padding: 1rem;
      width: 33.33%;
      overflow: hidden;
      box-sizing: border-box;
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
        }
        img {
          width: 100%;
        }
      }
    }
  }
`;

const PortfolioList = ({
  portfolioList,
  portfoliosError,
  lastPage,
  loading,
  user,
}) => {
  if (portfoliosError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // 로딩중이거나, 아직 데이터가 없을 시
  if (loading || !portfolioList) {
    return null;
  }

  return (
    <>
      <PortfolioListBlock>
        <div className="pageWrapper">
          {user && (
            <div className="writeButtonArea">
              <Button to="/write">새 글 작성하기</Button>
            </div>
          )}
          <ul>
            {portfolioList.map((list) => (
              <li key={list._id}>
                <Link to={`/portfolio/${list.id}`}>
                  <span>{list.client}</span>
                  <img src={list.thumbImage.url} alt={list.thumbImage.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PortfolioListBlock>
    </>
  );
};

export default PortfolioList;
