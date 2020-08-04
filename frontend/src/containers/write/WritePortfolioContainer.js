import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  checkId,
  writePortfolio,
  initialize,
  updatePortfolio,
} from "../../modules/write";
import { withRouter } from "react-router-dom";
import WritePortfolio from "./../../components/write/WritePortfolio";
import { initializePortfolios } from "../../modules/portfolios";

const WritePortfolioContainer = ({ history }) => {
  const dispatch = useDispatch();
  const form = useRef(null);
  const {
    id,
    hasId,
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
    contentImage,
    thumbImage,
    portfolio,
    portfolioError,
    originalPortfolioId,
    user,
  } = useSelector(({ write, user }) => ({
    id: write.id,
    hasId: write.hasId,
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
    contentImage: write.contentImage,
    thumbImage: write.thumbImage,
    portfolio: write.portfolio,
    portfolioError: write.portfolioError,
    originalPortfolioId: write.originalPortfolioId,
    user: user.user,
  }));

  const onCheckId = useCallback(
    (id) => {
      dispatch(checkId(id));
    },
    [dispatch]
  );

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  useEffect(() => {
    form.current = new FormData();
  }, []);

  const handleFormData = useCallback((key, value) => {
    key !== "contentImage"
      ? form.current.set(key, value)
      : form.current.append(key, value);

    return form.current;
  }, []);

  const onPublish = () => {
    // 아이디 중복일 경우
    if (originalPortfolioId !== id && hasId) {
      alert("중복된 아이디입니다");
      return;
    }

    const data = form.current;
    const host = hostValue ? hostValue : "null";

    // 업데이트
    if (originalPortfolioId) {
      handleFormData("id", id);
      handleFormData("client", client);
      handleFormData("host", hostValue);
      handleFormData("web", web);
      handleFormData("singlePage", singlePage);
      handleFormData("pcVer", pcVer);
      handleFormData("mobileVer", mobileVer);
      handleFormData("IEVersion", IEVersion);
      handleFormData("skill", skill);
      handleFormData("animationEvent", animationEvent);
      handleFormData("workYear", workYear);
      handleFormData("workMonth", workMonth);
      handleFormData("period", period);
      handleFormData("worker", worker);
      handleFormData("url", url);

      dispatch(updatePortfolio({ originalPortfolioId, data }));
      return;
    }

    // 포트폴리오 작성
    handleFormData("host", host);
    handleFormData("web", web);
    handleFormData("singlePage", singlePage);
    handleFormData("pcVer", pcVer);
    handleFormData("mobileVer", mobileVer);

    dispatch(writePortfolio(data));
  };

  useEffect(() => {
    if (!user) {
      history.go(-1);
    }

    if (!originalPortfolioId && !portfolioError) {
      console.log(2);
      dispatch(initialize());
    }

    if (portfolio) {
      history.push(`/portfolio/${portfolio.id}`);
    }

    if (portfolioError) {
      console.log(portfolioError);
    }

    return () => {
      if (portfolio && !portfolioError) {
        dispatch(initialize());
        dispatch(initializePortfolios());
      }
    };
  }, [dispatch, user, history, portfolio, portfolioError, originalPortfolioId]);

  return (
    <WritePortfolio
      onChangeField={onChangeField}
      onCheckId={onCheckId}
      id={id}
      hasId={hasId}
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
      thumbImage={thumbImage}
      contentImage={contentImage}
      handleFormData={handleFormData}
      onPublish={onPublish}
      portfolioError={portfolioError}
      originalPortfolioId={originalPortfolioId}
      isEdit={!!originalPortfolioId}
      user={user}
      form={form}
    />
  );
};

export default withRouter(WritePortfolioContainer);
