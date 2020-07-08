import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initialize } from "../../modules/write";
import { writePortfolio, writeFileUpload } from "../../modules/write";
import { withRouter } from "react-router-dom";
import WritePortfolio from "./../../components/write/WritePortfolio";

const WritePortfolioContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    id,
    client,
    hostValue,
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
    portfolio,
    portfolioError,
    originalPortfolioId,
  } = useSelector(({ write }) => ({
    id: write.id,
    client: write.client,
    hostValue: write.host,
    web: write.web,
    singlePage: write.singlePage,
    pcVer: write.pcVer,
    mobileVer: write.mobileVer,
    responsiveWeb: write.responsiveWeb,
    IEVersion: write.IEVersion,
    skill: write.skill,
    animationEvent: write.animationEvent,
    workYear: write.workYear,
    workMonth: write.workMonth,
    period: write.period,
    worker: write.worker,
    url: write.url,
    portfolio: write.portfolio,
    portfolioError: write.portfolioError,
    originalPortfolioId: write.originalPortfolioId,
  }));

  const [thumbImage, setThumbImage] = useState("");
  const [contentImage, setContentImage] = useState("");

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  const setThumbImageFile = (file) => {
    setThumbImage(file);
  };

  const setContentImageFile = (file) => {
    setContentImage(file);
  };

  const onPublish = () => {
    const host = hostValue ? hostValue : "null";
    const formData = {
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
      animationEvent,
      workYear,
      workMonth,
      period,
      worker,
      url,
    };
    const file = new FormData();

    file.append("thumbImage", thumbImage);
    file.append("contentImage", contentImage);
    file.append("id", id);

    dispatch(writePortfolio(formData));
    dispatch(writeFileUpload(file));
  };

  useEffect(() => {
    // if (portfolio) {
    //   const { id } = portfolio;
    //   history.push(`/portfolio/${id}`);
    // }
    if (portfolioError) {
      console.log(portfolioError);
    }

    return () => {
      // dispatch(initialize());
    };
  }, [dispatch, history, portfolio, portfolioError]);
  return (
    <WritePortfolio
      onChangeField={onChangeField}
      setThumbImageFile={setThumbImageFile}
      setContentImageFile={setContentImageFile}
      id={id}
      client={client}
      hostValue={hostValue}
      web={web}
      singlePage={singlePage}
      pcVer={pcVer}
      mobileVer={mobileVer}
      responsiveWeb={responsiveWeb}
      IEVersion={IEVersion}
      skill={skill}
      animationEvent={animationEvent}
      workYear={workYear}
      workMonth={workMonth}
      period={period}
      worker={worker}
      url={url}
      portfolio={portfolio}
      portfolioError={portfolioError}
      originalPortfolioId={originalPortfolioId}
      onPublish={onPublish}
    />
  );
};

export default withRouter(WritePortfolioContainer);
