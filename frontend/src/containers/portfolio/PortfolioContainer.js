import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Portfolio from "./../../components/portfolio/Portfolio";
import { readportfolio, unloadPortfolio } from "../../modules/portfolio";
import { setOriginalPortfolio } from "../../modules/writePortfolio";
import { removePortFolio } from "./../../lib/api/portfolios";
import { initializePortfolios } from "./../../modules/portfolios";

const PortfolioContainer = ({ match, history }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { portfolio, error, loading, user } = useSelector(
    ({ portfolio, loading, user }) => ({
      portfolio: portfolio.portfolio,
      error: portfolio.error,
      loading: loading["portfolio/READ_PORTFOLIO"],
      user: user.user,
    })
  );

  useEffect(() => {
    dispatch(readportfolio(id));
    // 언마운트 될 때 리덕스에서 포트폴리오 데이터 없애기
    return () => {
      dispatch(unloadPortfolio());
    };
  }, [dispatch, id]);

  const onEdit = () => {
    dispatch(setOriginalPortfolio(portfolio));
    history.push("/writePortfolio");
  };

  const onRemove = async () => {
    try {
      await removePortFolio(id);
      dispatch(initializePortfolios());
      history.push("/portfolios");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Portfolio
      portfolio={portfolio}
      error={error}
      loading={loading}
      user={user}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
};

export default withRouter(PortfolioContainer);
