import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PortfolioListBlock = styled.div`
  margin: 3rem 0;
  ul {
    margin: 0 auto;
    width: 1200px;
    align-items: center;
    justify-content: center;
    li {
      display: inline-block;
      vertical-align: middle;
      padding: 1rem;
      width: 400px;
      height: 400px;
      overflow: hidden;
      box-sizing: border-box;
      a {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
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
}) => {
  if (portfoliosError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <PortfolioListBlock>
      {!loading && portfolioList && (
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
      )}
    </PortfolioListBlock>
  );
};

export default PortfolioList;
