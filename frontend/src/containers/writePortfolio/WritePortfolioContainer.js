import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  checkId,
  writePortfolio,
  initializeWrite,
  updatePortfolio,
} from "../../modules/writePortfolio";
import { withRouter } from "react-router-dom";
import WritePortfolio from "./../../components/writePortfolio/WritePortfolio";
import { initializePortfolios } from "../../modules/portfolios";

const WritePortfolioContainer = ({ history }) => {
  const dispatch = useDispatch();
  const thumbImageRef = useRef(null);
  const clientImageRef = useRef(null);
  const contentImageRef = useRef(null);
  const {
    id,
    hasId,
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
    contentImage,
    clientImage,
    thumbImage,
    portfolio,
    portfolioError,
    originalPortfolioId,
    user,
  } = useSelector(({ writePortfolio, user }) => ({
    id: writePortfolio.id,
    hasId: writePortfolio.hasId,
    client: writePortfolio.client,
    host: writePortfolio.host,
    web: writePortfolio.web,
    singlePage: writePortfolio.singlePage,
    pcVer: writePortfolio.pcVer,
    mobileVer: writePortfolio.mobileVer,
    responsiveWeb: writePortfolio.responsiveWeb,
    IEVersion: writePortfolio.IEVersion,
    skill: writePortfolio.skill,
    workYear: writePortfolio.workYear,
    workMonth: writePortfolio.workMonth,
    period: writePortfolio.period,
    worker: writePortfolio.worker,
    url: writePortfolio.url,
    contentImage: writePortfolio.contentImage,
    clientImage: writePortfolio.clientImage,
    thumbImage: writePortfolio.thumbImage,
    portfolio: writePortfolio.portfolio,
    portfolioError: writePortfolio.portfolioError,
    originalPortfolioId: writePortfolio.originalPortfolioId,
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

  const onPublish = () => {
    // 아이디 중복일 경우
    if (originalPortfolioId !== id && hasId) {
      alert("중복된 아이디입니다");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("client", client);
    host && formData.append("host", host);
    formData.append("web", web);
    formData.append("singlePage", singlePage);
    formData.append("pcVer", pcVer);
    formData.append("mobileVer", mobileVer);
    formData.append("responsiveWeb", responsiveWeb);
    formData.append("IEVersion", IEVersion);
    formData.append("skill", skill);
    formData.append("workYear", workYear);
    formData.append("workMonth", workMonth);
    formData.append("period", period);
    formData.append("worker", worker);
    formData.append("url", url);
    thumbImageRef.current !== null &&
      formData.append("thumbImage", thumbImageRef.current);
    clientImageRef.current !== null &&
      formData.append("clientImage", clientImageRef.current);
    contentImageRef.current !== null &&
      contentImageRef.current.map((file) =>
        formData.append("contentImage", file)
      );

    // 업데이트
    if (originalPortfolioId) {
      dispatch(updatePortfolio({ originalPortfolioId, formData }));
      return;
    }

    // 포트폴리오 작성
    dispatch(writePortfolio(formData));
  };

  useEffect(() => {
    if (!user) {
      history.go(-1);
    }

    if (!originalPortfolioId && !portfolioError) {
      dispatch(initializeWrite());
    }

    if (portfolio) {
      dispatch(initializePortfolios());
      history.push(`/portfolio/${portfolio.id}`);
    }

    if (portfolioError) {
      console.log(portfolioError);
    }

    return () => {
      if (portfolio && !portfolioError) {
        dispatch(initializeWrite());
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
      host={host}
      web={web}
      singlePage={singlePage}
      pcVer={pcVer}
      mobileVer={mobileVer}
      responsiveWeb={responsiveWeb}
      IEVersion={IEVersion}
      skill={skill}
      workYear={workYear}
      workMonth={workMonth}
      period={period}
      worker={worker}
      url={url}
      thumbImage={thumbImage}
      clientImage={clientImage}
      contentImage={contentImage}
      thumbImageRef={thumbImageRef}
      clientImageRef={clientImageRef}
      contentImageRef={contentImageRef}
      onPublish={onPublish}
      portfolioError={portfolioError}
      originalPortfolioId={originalPortfolioId}
      isEdit={!!originalPortfolioId}
      user={user}
    />
  );
};

export default withRouter(WritePortfolioContainer);
