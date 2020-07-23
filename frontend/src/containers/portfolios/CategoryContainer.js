import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../../components/portfoilos/Category";
import {
  category,
  checkedCategory,
  initializePortfolios,
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

  // 스킬 체크박스 클릭시
  const clickSkillCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      dispatch(initializePortfolios());
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
    },
    [skillCheckbox, dispatch]
  );

  // 타입 체크박스 클릭시
  const clickTypeCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      dispatch(initializePortfolios());
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
    },
    [typeCheckbox, dispatch]
  );

  // 카테고리 API 호출
  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  // 체크박스 초기화
  useEffect(() => {
    const skillInputArr = Array.from(
      document.getElementsByClassName("skillInput")
    );
    const typeCheckboxArr = Array.from(
      document.getElementsByClassName("typeInput")
    );
    if (!location.search) {
      skillInputArr.map((skillInput) => (skillInput.checked = false));
      typeCheckboxArr.map((typeInput) => (typeInput.checked = false));
    }
  }, [location]);

  useEffect(() => {
    const skillInputArr = Array.from(
      document.getElementsByClassName("skillInput")
    );
    const typeCheckboxArr = Array.from(
      document.getElementsByClassName("typeInput")
    );

    // 뒤로가기 했을 경우 체크박스 체크 유지
    if (history.action === "POP") {
      skillInputArr.map((skillInput) =>
        skillCheckbox.map(
          (checked) =>
            skillInput.value === checked && (skillInput.checked = true)
        )
      );
      typeCheckboxArr.map((typeInput) =>
        typeCheckbox.map(
          (checked) => typeInput.value === checked && (typeInput.checked = true)
        )
      );
    }

    const skillQuery =
      skillCheckbox.length === 0 ? "" : `&skill=${skillCheckbox}`;
    const typeQuery = typeCheckbox.map((t) => `&${t}=true`).join("");
    const query = (skillQuery + typeQuery).substring(1);

    // 체크박스 클릭시 URL 이동
    history.push(`/portfolios?${query}`);
  }, [history, skillCheckbox, typeCheckbox]);

  return (
    <Category
      categories={categories}
      skillCheckbox={skillCheckbox}
      typeCheckbox={typeCheckbox}
      error={error}
      loading={loading}
      clickSkillCheckbox={clickSkillCheckbox}
      clickTypeCheckbox={clickTypeCheckbox}
    />
  );
};

export default withRouter(CategoryContainer);
