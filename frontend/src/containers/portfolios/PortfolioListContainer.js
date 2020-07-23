import React, { useEffect, useRef, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import useIntersectionObserver from "./../../lib/useIntersectionObserver";
import {
  portfolios,
  initializePortfolios,
  currentPage,
} from "../../modules/portfolios";

const PortfolioListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const {
    portfolioList,
    portfoliosError,
    portfolioLoading,
    crtPage,
    lastPage,
    user,
  } = useSelector(({ portfolios, loading, user }) => ({
    portfolioList: portfolios.portfolios,
    portfoliosError: portfolios.portfoliosError,
    portfolioLoading: loading["portfolios/PORTFOLIOS"],
    lastPage: portfolios.lastPage,
    crtPage: portfolios.currentPage,
    user: user.user,
  }));

  const loadPortfolio = useCallback(
    (page) => {
      const { skill, web, singlePage } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      dispatch(
        portfolios({
          skill,
          web,
          singlePage,
          page,
        })
      );
    },
    [dispatch, location.search]
  );

  // 포트폴리오 API 호출
  const searchPortfolio = useCallback(() => {
    dispatch(currentPage(1));
    loadPortfolio();
  }, [dispatch, loadPortfolio]);

  // 뒤로가기 시 데이터를 유지하기 위해 처음에만 데이터를 불러옴
  useEffect(() => {
    if (!portfolioList.length) {
      searchPortfolio();
    }
  }, [portfolioList]);

  // 다음 페이지 포트폴리오 API 호츌
  const loadMorePortfolio = useCallback(async () => {
    if (portfolioList.length > 0) {
      dispatch(currentPage(crtPage + 1));

      loadPortfolio(crtPage + 1);
    }
  }, [portfolioList]);

  // 맨 아래로 내렸을 때를 감지하는 이벤트
  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !portfolioLoading && crtPage < lastPage) {
          loadMorePortfolio();
        }
      });
    },
  });

  return (
    <PortfolioList
      portfolioList={portfolioList}
      portfoliosError={portfoliosError}
      portfolioLoading={portfolioLoading}
      user={user}
      ref={targetRef}
    />
  );
};

export default withRouter(PortfolioListContainer);
