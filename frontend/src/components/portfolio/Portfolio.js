import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Responsive from "./../common/Responsive";

const PortfolioBlock = styled.div`
  margin: 10rem auto;
  width: 1200px;
  .resposiveBlock {
    > a {
      margin-right: 1rem;
    }
  }
  li {
    font-size: 1.1rem;
    font-family: "trump-gothic-pro";
    color: #b1b1b1;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    span {
      display: inline-block;
      margin-right: 20px;
      color: #454545;
      font-weight: bold;
      border-bottom: 1px solid #7b7b7b;
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
    contentImage,
  } = portfolio;

  const skillArray = skill.join(", ");
  const animationEventArray = animationEvent.join(", ");

  return (
    <PortfolioBlock>
      <Responsive>
        {user && (
          <>
            <Button to="/portfolios">리스트로 가기</Button>
            <Button onClick={onEdit}>수정</Button>
            <Button onClick={onRemove}>삭제</Button>
          </>
        )}
        <ul>
          <li>
            <span>CLIENT</span>
            {client}
          </li>
          <li>
            {host !== "null" && <span>host</span>}
            {host !== "null" && host}
          </li>
          <li>
            <span>TYPE</span>
            {web && "Web"}
            {singlePage && "singlePage"}
          </li>
          <li>
            <span>VERSION</span>
            {pcVer && "PC version"}
            {mobileVer && "Mobile Version"}
            {responsiveWeb && "반응형 웹"}
          </li>
          <li>
            <span>IE VERSION</span>
            {IEVersion}
          </li>
          <li>
            <span>SKILL</span>
            {skillArray}
          </li>
          <li>
            <span>ANIMATION EVENT</span>
            {animationEventArray}
          </li>
          <li>
            <span>WHEN</span>
            {workYear} {workMonth}
          </li>
          <li>
            <span>PERIOD</span>
            {period}
          </li>
          <li>
            <span>WORKER</span>
            {worker}
          </li>
          <li>
            <span>URL</span>
            {url.map((d) => {
              return (
                <a target="_blank" rel="noopener noreferrer" href={d} key={d}>
                  {d}
                </a>
              );
            })}
          </li>
          <li>
            <img src={`../${contentImage.url}`} alt={contentImage.name} />
          </li>
        </ul>
      </Responsive>
    </PortfolioBlock>
  );
};

export default Portfolio;
