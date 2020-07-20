import React, { useEffect, useRef, useCallback, useState } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import PortfolioList from "./../../components/portfoilos/PortfolioList";
import useIntersectionObserver from "./../../lib/useIntersectionObserver";
// import { portfolios } from "../../modules/portfolios";
import { list } from "./../../lib/api/portfolios";

const PortfolioListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    //portfolioList,
    portfoliosError,
    loading,
    //pfloading,
    user,
  } = useSelector(({ portfolios, loading, user }) => ({
    portfolioList: portfolios.portfolios,
    portfoliosError: portfolios.portfoliosError,
    loading: loading["portfolios/CATEGORY"],
    pfloading: loading["portfolios/PORTFOLIOS"],
    user: user.user,
  }));

  // instance variable
  const currentPage = useRef(1);
  const lastPage = useRef(0);

  // request state
  const [listLoading, setListloading] = useState(false);
  const [error, setError] = useState(null);

  // contents list
  const [lists, setLists] = useState([]);

  // ref
  const targetRef = useRef(null);

  const loadPortfolio = useCallback(
    async ({ skill, web, singlePage, page }) => {
      try {
        setListloading(true);
        const data = await list({
          skill,
          web,
          singlePage,
          page,
        });
        lastPage.current = parseInt(data.headers["last-page"], 10);
        return data;
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setListloading(false);
      }
    },
    []
  );

  const searchPortfolio = useCallback(async () => {
    const { skill, web, singlePage } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    currentPage.current = 1;
    const data = await loadPortfolio({ skill, web, singlePage });
    setLists(data.data);
  }, [location.search]);

  useEffect(() => {
    searchPortfolio();
  }, [location.search]);

  const loadMorePortfolio = useCallback(async () => {
    if (lists.length > 0) {
      currentPage.current++;
      const { skill, web, singlePage } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const data = await loadPortfolio({
        skill,
        web,
        singlePage,
        page: currentPage.current,
      });
      setLists([...lists, ...data.data]);
    }
  }, [location.search, lists]);

  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !listLoading &&
          currentPage.current < lastPage.current
        ) {
          loadMorePortfolio();
        }
      });
    },
  });

  // const loadMorePortfolio = useCallback(async () => {
  //   if (portfolioList.length > 0) {
  //     currentPage.current++;
  //     const { skill, web, singlePage } = qs.parse(location.search, {
  //       ignoreQueryPrefix: true,
  //     });
  //     dispatch(
  //       portfolios({ skill, web, singlePage, page: currentPage.current })
  //     );

  //     console.log("portfolioList ", portfolioList);
  //     setList([...list, ...portfolioList]);
  //   }
  // }, [dispatch, portfolioList, location.search, list]);

  // useEffect(() => {
  //   const { skill, web, singlePage } = qs.parse(location.search, {
  //     ignoreQueryPrefix: true,
  //   });
  //   dispatch(portfolios({ skill, web, singlePage }));
  // }, [dispatch, location.search]);

  // useEffect(() => {
  //   if (portfolioList) {
  //     console.log("list ", list);
  //   }
  // }, [list]);

  return (
    <PortfolioList
      portfolioList={lists}
      portfoliosError={portfoliosError}
      loading={loading}
      user={user}
      ref={targetRef}
      listLoading={listLoading}
    ></PortfolioList>
  );
};

export default withRouter(PortfolioListContainer);
