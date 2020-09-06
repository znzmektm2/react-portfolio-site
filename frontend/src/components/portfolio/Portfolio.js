import React, { useEffect } from "react";
import "./Portfolio.scss";
import Button from "../common/Button";
import useIO from "./../../lib/useIO";
import Image from "./../common/Image";

const Portfolio = ({ portfolio, error, loading, user, onEdit, onRemove }) => {
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });

  useEffect(() => {
    if (!loading && portfolio) {
      let img = document.getElementsByClassName("lazy");
      setElements(img);
    }
  }, [loading, portfolio, setElements]);

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
    id,
    client,
    host,
    web,
    singlePage,
    pcVer,
    mobileVer,
    responsiveWeb,
    IEVersion,
    skill,
    workYear,
    workMonth,
    period,
    worker,
    url,
    thumbImage,
    contentImage,
  } = portfolio;

  return (
    <div className="portfolioBlock">
      <div className="intro">
        <div className="half introImg">
          <a href={url[0]} target="_blank" rel="noopener noreferrer">
            <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
          </a>
          <span className="bg">
            {navigator.userAgent.match(/Trident\/7\./) ? (
              <svg>
                <defs>
                  <filter id="filter">
                    <feGaussianBlur stdDeviation="12" />
                  </filter>
                </defs>
                <image
                  href={`../${thumbImage.url}`}
                  width="100%"
                  height="100%"
                  filter="url(#filter)"
                  alt={thumbImage.name}
                />
              </svg>
            ) : (
              <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
            )}
          </span>
        </div>
        <div className="half introTxt">
          <div className="lineBox">
            <span className="line step1" />
            <span className="line step2" />
            <span className="line step3" />
            <span className="line step4" />
            <div className="txtWrap">
              <h2>
                <a href={url[0]} target="_blank" rel="noopener noreferrer">
                  <span>{id}</span>
                </a>
              </h2>
              <h3>
                <a href={url[0]} target="_blank" rel="noopener noreferrer">
                  {client}
                </a>
              </h3>
              <div className="detailList">
                <ul>
                  {host ? (
                    <li>
                      <span>HOST</span>
                      <span>{host}</span>
                    </li>
                  ) : null}

                  <li>
                    <span>TYPE</span>
                    <span>
                      {web && "Web"}
                      {singlePage && "SinglePage"}
                    </span>
                  </li>
                  <li>
                    <span>VERSION</span>
                    <span>
                      {pcVer ? (mobileVer ? "PC / Mobile" : "PC") : "Mobile"}
                      {responsiveWeb && " / 반응형"}
                    </span>
                  </li>
                  <li>
                    <span>IE VERSION</span>
                    <span>{IEVersion}</span>
                  </li>
                  <li>
                    <span>WHEN</span>
                    <span>
                      {workYear} {workMonth}
                    </span>
                  </li>
                  <li>
                    <span>PERIOD</span>
                    <span>{period}</span>
                  </li>
                  <li>
                    <span>WORKER</span>
                    <span>{worker}</span>
                  </li>
                  <li>
                    <span>SKILL</span>
                    <span>{skill.join(", ")}</span>
                  </li>
                  <li>
                    <span>URL</span>
                    {url.map((u) => {
                      return (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={u}
                          key={u}
                        >
                          <span>{u}</span>
                        </a>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contentBox">
        <div className="wrap">
          {user && (
            <div className="buttonBox">
              <Button to="/portfolios">리스트로 가기</Button>
              <Button onClick={onRemove}>삭제</Button>
              <Button onClick={onEdit}>수정</Button>
            </div>
          )}
          {contentImage.map((contImg) => (
            <Image
              key={contImg.url}
              src={`../${contImg.url}`}
              alt={contImg.name}
              isLazy
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
