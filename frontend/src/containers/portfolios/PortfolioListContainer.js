import React, { useEffect } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import { portfolios } from "../../modules/portfolios";

const PortfolioListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { portfolioList, portfoliosError, lastPage, loading } = useSelector(
    ({ portfolios, loading }) => ({
      portfolioList: portfolios.portfolios,
      portfoliosError: portfolios.portfoliosError,
      lastPage: portfolios.lastPage,
      loading: loading["portfolios/CATEGORY"],
    })
  );

  useEffect(() => {
    const { skill, web, singlePage } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(portfolios({ skill, web, singlePage }));
  }, [dispatch, location.search]);

  return (
    <PortfolioList
      portfolioList={portfolioList}
      portfoliosError={portfoliosError}
      lastPage={lastPage}
      loading={loading}
    />
  );
};

export default withRouter(PortfolioListContainer);
