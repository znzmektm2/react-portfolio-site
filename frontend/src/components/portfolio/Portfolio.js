import React from "react";

const Portfolio = ({ portfolio, error, loading, user }) => {
  // 에러 발생시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <div>존재하지 않는 포트폴리오 입니다.</div>;
    }
  }

  // 로딩중이거나, 아직 포트폴리오 데이터가 없을 시
  if (loading || !portfolio) {
    return null;
  }

  const {
    id,
    client,
    skill,
    workYear,
    workMonth,
    period,
    worker,
    contentImage,
    IEVersion,
  } = portfolio;
  const url = `../${contentImage.url}`;
  return (
    <div>
      <ul>
        <li>id : {id}</li>
        <li>client : {client}</li>
        <li>skill : {skill}</li>
        <li>workYear : {workYear}</li>
        <li>workMonth : {workMonth}</li>
        <li>period : {period}</li>
        <li>worker : {worker}</li>
        <li>IEVersion : {IEVersion}</li>
        <li>
          contentImage : <br />
          <img src={url} alt={contentImage.name} />
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
