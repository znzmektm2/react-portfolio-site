import React, { useEffect, useMemo, useCallback } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../../components/portfoilos/Category";
import {
  category,
  checkedCategory,
  initializePortfolios,
  initializeCheckbox,
} from "../../modules/portfolios";
import { withRouter } from "react-router-dom";

const CategoryContainer = ({ history, location }) => {
  const dispatch = useDispatch();
  const {
    categories,
    skillCheckbox,
    typeCheckbox,
    error,
    loading,
  } = useSelector(({ portfolios, loading }) => ({
    categories: portfolios.category,
    skillCheckbox: portfolios.skillCheckbox,
    typeCheckbox: portfolios.typeCheckbox,
    error: portfolios.error,
    loading: loading["portfolios/CATEGORY"],
  }));

  const skillInputArr = Array.from(
    document.getElementsByClassName("skillInput")
  );
  const typeInputArr = Array.from(document.getElementsByClassName("typeInput"));

  const skillQuery = useMemo(() => {
    return skillCheckbox.length === 0 ? "" : "&skill=" + skillCheckbox;
  }, [skillCheckbox]);

  const typeQuery = useMemo(() => {
    return typeCheckbox.map((t) => `&${t}=true`).join("");
  }, [typeCheckbox]);

  const clickSkillCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      // 포트폴리오 리스트, 현재페이지 초기화
      dispatch(initializePortfolios());

      // 스킬 체크박스 클릭시 스토어에 배열 만들기
      dispatch(
        checkedCategory(
          isChecked
            ? { key: "skillCheckbox", value: [...skillCheckbox, thisValue] }
            : {
                key: "skillCheckbox",
                value: skillCheckbox.filter((c) => c !== thisValue),
              }
        )
      );

      // 스킬 체크박스 클릭시 URL 이동
      const skillArr = isChecked
        ? [...skillCheckbox, thisValue]
        : skillCheckbox.filter((c) => c !== thisValue);
      const _skillQuery = skillArr.length === 0 ? "" : "&skill=" + skillArr;
      const urlQuery = (_skillQuery + typeQuery).substring(1);

      history.push(`/portfolios?${urlQuery}`);
    },
    [skillCheckbox, dispatch, typeQuery, history]
  );

  const clickTypeCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      // 포트폴리오 리스트, currentPage 초기화
      dispatch(initializePortfolios());

      // 타입 체크박스 클릭시 스토어에 배열 만들기
      dispatch(
        checkedCategory(
          isChecked
            ? { key: "typeCheckbox", value: [...typeCheckbox, thisValue] }
            : {
                key: "typeCheckbox",
                value: typeCheckbox.filter((c) => c !== thisValue),
              }
        )
      );

      // 타입 체크박스 클릭시 URL 이동
      const typeArr = isChecked
        ? [...typeCheckbox, thisValue]
        : typeCheckbox.filter((c) => c !== thisValue);
      const _typeQuery =
        typeArr.length === 0 ? "" : typeArr.map((t) => `&${t}=true`).join("");
      const urlQuery = (skillQuery + _typeQuery).substring(1);

      history.push(`/portfolios?${urlQuery}`);
    },
    [typeCheckbox, dispatch, skillQuery, history]
  );

  // 카테고리 API 호출
  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  //URL query에 따라 체크박스 유지하기
  useEffect(() => {
    const { skill, web, singlePage } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const skillArr = !!skill ? skill.split(",") : [];
    const typeArr = [!!web && "web", !!singlePage && "singlePage"];

    skillInputArr.map((skillInput) =>
      skillArr.map(
        (skill) => skillInput.value === skill && (skillInput.checked = true)
      )
    );

    typeInputArr.map((typeInput) =>
      typeArr.map(
        (type) => typeInput.value === type && (typeInput.checked = true)
      )
    );
  });

  // 포트폴리오 메뉴 클릭시 체크박스 초기화
  useEffect(() => {
    if (!location.search && history.action === "PUSH") {
      dispatch(initializeCheckbox());
      skillInputArr.map((skillInput) => (skillInput.checked = false));
      typeInputArr.map((typeInput) => (typeInput.checked = false));
    }
  }, [location.search, history.action, dispatch]);

  return (
    <Category
      categories={categories}
      error={error}
      loading={loading}
      clickSkillCheckbox={clickSkillCheckbox}
      clickTypeCheckbox={clickTypeCheckbox}
    />
  );
};

export default withRouter(CategoryContainer);
