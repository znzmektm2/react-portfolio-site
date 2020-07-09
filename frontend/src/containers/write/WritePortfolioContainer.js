import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, idCheck, initialize } from "../../modules/write";
import { writePortfolio } from "../../modules/write";
import { withRouter } from "react-router-dom";
import WritePortfolio from "./../../components/write/WritePortfolio";

const WritePortfolioContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    id,
    checkId,
    checkIdError,
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
  } = useSelector(({ write }) => ({
    id: write.id,
    checkId: write.checkId,
    checkIdError: write.checkIdError,
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

  const onCheckId = useCallback(
    (id) => {
      dispatch(idCheck(id));
    },
    [dispatch]
  );

  const setThumbImageFile = useCallback((file) => setThumbImage(file), []);
  const setContentImageFile = useCallback((file) => setContentImage(file), []);

  const onPublish = () => {
    const host = hostValue ? hostValue : "null";
    const formData = new FormData();

    formData.append("id", id);
    formData.append("client", client);
    formData.append("host", host);
    formData.append("web", web);
    formData.append("singlePage", singlePage);
    formData.append("pcVer", pcVer);
    formData.append("mobileVer", mobileVer);
    formData.append("responsiveWeb", responsiveWeb);
    formData.append("IEVersion", IEVersion);
    formData.append("skill", skill);
    formData.append("animationEvent", animationEvent);
    formData.append("workYear", workYear);
    formData.append("workMonth", workMonth);
    formData.append("period", period);
    formData.append("worker", worker);
    formData.append("url", url);
    formData.append("thumbImage", thumbImage);
    formData.append("contentImage", contentImage);

    dispatch(writePortfolio(formData));
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
  }, [dispatch, history, portfolio, portfolioError, checkIdError]);
  return (
    <WritePortfolio
      onChangeField={onChangeField}
      onCheckId={onCheckId}
      id={id}
      checkId={checkId}
      checkIdError={checkIdError}
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
      setThumbImageFile={setThumbImageFile}
      setContentImageFile={setContentImageFile}
      onPublish={onPublish}
      portfolio={portfolio}
    />
  );
};

export default withRouter(WritePortfolioContainer);
