import React, { useEffect, useRef, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import useIntersectionObserver from "./../../lib/useIntersectionObserver";
import {
  portfolios,
  currentPage,
  initializePortfolios,
} from "../../modules/portfolios";

const PortfolioListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const {
    portfolioList,
    portfoliosError,
    portfolioLoading,
    page,
    lastPage,
    user,
  } = useSelector(({ portfolios, loading, user }) => ({
    portfolioList: portfolios.portfolios,
    portfoliosError: portfolios.portfoliosError,
    portfolioLoading: loading["portfolios/PORTFOLIOS"],
    page: portfolios.currentPage,
    lastPage: portfolios.lastPage,
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

  // 포트폴리오 API 호출 이벤트
  const searchPortfolio = useCallback(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  // 다음 페이지 포트폴리오 API 호츌 이벤트
  const loadMorePortfolio = useCallback(async () => {
    if (portfolioList.length > 0) {
      dispatch(currentPage(page + 1));
      loadPortfolio(page + 1);
    }
  }, [dispatch, portfolioList.length, page, loadPortfolio]);

  // 맨 아래로 내렸을 때를 감지하는 이벤트
  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !portfolioLoading && page < lastPage) {
          loadMorePortfolio();
        }
      });
    },
  });

  // 포트폴리오 메뉴 클릭시 포트폴리오 초기화
  useEffect(() => {
    if (!location.search && history.action === "PUSH") {
      dispatch(initializePortfolios());
    }
  }, [location.search, history.action, dispatch]);

  // 포트폴리오가 없을 경우 API 호출(뒤로가기 시 포트폴리오 API 호출 막기)
  useEffect(() => {
    if (!portfolioList.length) {
      searchPortfolio();
    }
  }, [portfolioList.length, dispatch, searchPortfolio]);

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
