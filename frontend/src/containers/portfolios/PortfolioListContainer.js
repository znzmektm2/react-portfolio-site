import React, { useEffect, useRef, useState, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import useIntersectionObserver from "./../../lib/useIntersectionObserver";
import { portfolios, currentPage } from "../../modules/portfolios";

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

  const loadPortfolio = useCallback(({ skill, web, singlePage, page }) => {
    dispatch(
      portfolios({
        skill,
        web,
        singlePage,
        page,
      })
    );
  }, []);

  const searchPortfolio = useCallback(() => {
    const { skill, web, singlePage } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(currentPage(1));
    loadPortfolio({ skill, web, singlePage });
  }, [dispatch, location.search]);

  useEffect(() => {
    if (!portfolioList.length) {
      searchPortfolio();
    }
  }, [location.search]);

  const loadMorePortfolio = useCallback(async () => {
    if (portfolioList.length > 0) {
      dispatch(currentPage(crtPage + 1));
      const { skill, web, singlePage } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      loadPortfolio({
        skill,
        web,
        singlePage,
        page: crtPage + 1,
      });
    }
  }, [portfolioList]);

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
