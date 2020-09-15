import React, { useEffect, useState, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import PortfolioCategory from "./../../components/portfoilos/PortfolioCategory";
import { category, initializePortfolios } from "../../modules/portfolios";
import { withRouter } from "react-router-dom";

const PortfolioCategoryContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const [skillCheckbox, setSkillCheckbox] = useState(null);
  const [typeCheckbox, setTypeCheckbox] = useState(null);
  const { categories, error, loading } = useSelector(
    ({ portfolios, loading }) => ({
      categories: portfolios.category,
      error: portfolios.error,
      loading: loading["portfolios/CATEGORY"],
    })
  );

  // 스킬 체크박스 클릭 이벤트
  const clickSkillCheckbox = useCallback(
    (e) => {
      // 포트폴리오 리스트, currentPage 초기화
      dispatch(initializePortfolios());

      // 스킬 체크박스 클릭시 useState에 배열 넣기
      e.target.checked
        ? setSkillCheckbox(
            !!skillCheckbox
              ? [...skillCheckbox, e.target.value]
              : [e.target.value]
          )
        : setSkillCheckbox(skillCheckbox.filter((c) => c !== e.target.value));
    },
    [skillCheckbox, dispatch]
  );

  // 타입 체크박스 클릭 이벤트
  const clickTypeCheckbox = useCallback(
    (e) => {
      // 포트폴리오 리스트, currentPage 초기화
      dispatch(initializePortfolios());

      // 타입 체크박스 클릭시 useState에 배열 넣기
      e.target.checked
        ? setTypeCheckbox(
            !!typeCheckbox
              ? [...typeCheckbox, e.target.value]
              : [e.target.value]
          )
        : setTypeCheckbox(typeCheckbox.filter((c) => c !== e.target.value));
    },
    [typeCheckbox, dispatch]
  );

  // 카테고리 API 호출
  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  // 체크박스 클릭시 URL 이동
  useEffect(() => {
    let query =
      !!skillCheckbox && skillCheckbox.length !== 0
        ? "&skill=" + skillCheckbox
        : "";

    query += !!typeCheckbox
      ? typeCheckbox.map((t) => `&${t}=true`).join("")
      : "";

    if (!!skillCheckbox || !!typeCheckbox) {
      history.push(`/portfolios?${query.substring(1)}`);
    }
  }, [skillCheckbox, typeCheckbox, history]);

  useEffect(() => {
    // history.action POP일 경우, URL query에 따라 useState에 체크박스 배열 넣기
    const { skill, web, singlePage } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (history.action === "POP") {
      if (!!skill) {
        setSkillCheckbox(skill.split(","));
      }

      if (!!web || !!singlePage) {
        const typebox = [!!web && "web", !!singlePage && "singlePage"].filter(
          (t) => t !== false
        );

        setTypeCheckbox(typebox);
      }
    }

    if (!location.search) {
      // 포트폴리오 메뉴 클릭시 useState에 체크박스 배열 초기화
      setSkillCheckbox(null);
      setTypeCheckbox(null);

      // 포트폴리오 메뉴 클릭시 체크박스 체크 모두 해제
      const input = Array.from(document.getElementsByTagName("input"));
      input.map((i) => (i.checked = false));
    }
  }, [location.search, history]);

  return (
    <PortfolioCategory
      categories={categories}
      error={error}
      loading={loading}
      clickSkillCheckbox={clickSkillCheckbox}
      clickTypeCheckbox={clickTypeCheckbox}
      skillCheckbox={skillCheckbox}
      typeCheckbox={typeCheckbox}
      location={location}
    />
  );
};

export default withRouter(PortfolioCategoryContainer);
