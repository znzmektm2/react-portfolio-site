import React, { useEffect, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import useIO from "./../../lib/useIO";
import {
  portfolios,
  currentPage,
  initializePortfolios,
} from "../../modules/portfolios";

const PortfolioListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const [observer, setElements, entries] = useIO({
    threshold: 0,
    root: null,
  });
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

  // 스크롤 타겟 관리(img, .bottomTarget)
  useEffect(() => {
    if (!portfolioLoading && portfolioList) {
      const img = document.querySelectorAll(".lazy");
      const bottomTarget = document.getElementsByClassName("bottomTarget");
      const array = [...img, ...bottomTarget];
      setElements(array);
    }
  }, [portfolioLoading, portfolioList, setElements]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 이미지에 appear 클래스 추가
        let target = entry.target;
        if (target.tagName === "IMG") {
          target.src = target.dataset.src;
          target.classList.remove("lazy");
          target.parentNode.parentNode.parentNode.classList.add("appear");
          observer.unobserve(target);
        }

        // 리스트를 끝까지 내렸을 때 다음 페이지 API 호출
        if (!portfolioLoading && page < lastPage) {
          loadMorePortfolio();
        }
      }
    });
  }, [entries, observer, portfolioLoading, page, lastPage, loadMorePortfolio]);

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
  }, [portfolioList.length, searchPortfolio]);

  return (
    <PortfolioList
      portfolioList={portfolioList}
      portfoliosError={portfoliosError}
      portfolioLoading={portfolioLoading}
      user={user}
    />
  );
};

export default withRouter(PortfolioListContainer);
