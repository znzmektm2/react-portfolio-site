import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../../components/portfoilos/Category";
import { category } from "../../modules/portfolios";
import { withRouter } from "react-router-dom";

const CategoryContainer = ({ history }) => {
  const [skillCheckbox, setSkillCheckbox] = useState([]);
  const [typeCheckbox, setTypeCheckbox] = useState([]);
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector(
    ({ portfolios, loading }) => ({
      categories: portfolios.category,
      error: portfolios.error,
      loading: loading["portfolios/CATEGORY"],
    })
  );

  // 스킬 체크박스 클릭시
  const clickSkillCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      setSkillCheckbox(
        isChecked
          ? [...skillCheckbox, thisValue]
          : skillCheckbox.filter((c) => c !== thisValue)
      );
    },
    [skillCheckbox]
  );

  // 타입 체크박스 클릭시
  const clickTypeCheckbox = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;

      setTypeCheckbox(
        isChecked
          ? [...typeCheckbox, thisValue]
          : typeCheckbox.filter((c) => c !== thisValue)
      );
    },
    [typeCheckbox]
  );

  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  useEffect(() => {
    let skillQuery = skillCheckbox.length === 0 ? "" : `skill=${skillCheckbox}`;

    const typeQuery = typeCheckbox.map((t) => `&${t}=true`).join("");

    history.push(`/portfolios?${skillQuery + typeQuery}`);
  }, [history, skillCheckbox, typeCheckbox]);

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
