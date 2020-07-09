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

  return (
    <div>
      <ul>
        <li>client : {client}</li>
        <li>{host !== "null" && `host : ${host}`}</li>
        <li>{web && `web : ${web}`}</li>
        <li>{singlePage && `singlePage : ${singlePage}`}</li>
        <li>{pcVer && `pcVer : ${pcVer}`}</li>
        <li>{mobileVer && `mobileVer : ${mobileVer}`}</li>
        <li>{responsiveWeb && `responsiveWeb : ${responsiveWeb}`}</li>
        <li>IEVersion : {IEVersion}</li>
        <li>skill : {skill}</li>
        <li>animationEvent : {animationEvent}</li>
        <li>workYear : {workYear}</li>
        <li>workMonth : {workMonth}</li>
        <li>period : {period}</li>
        <li>worker : {worker}</li>
        <li>
          url :
          <a target="_blank" rel="noopener noreferrer" href={url}>
            {url}
          </a>
        </li>
        <li>
          <img src={`../${contentImage.url}`} alt={contentImage.name} />
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
