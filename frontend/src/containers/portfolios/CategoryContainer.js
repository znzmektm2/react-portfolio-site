import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./../../components/portfoilos/Category";
import { category } from "../../modules/portfolios";
import { withRouter } from "react-router-dom";

const CategoryContainer = ({ history }) => {
  const [typeCheckbox, setTypeCheckbox] = useState([]);
  const [skillCheckbox, setSkillCheckbox] = useState([]);
  const [typeQueryState, setTypeQueryState] = useState("");
  const [skillQueryState, setSkillQueryState] = useState("");
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector(
    ({ portfolios, loading }) => ({
      categories: portfolios.category,
      error: portfolios.error,
      loading: loading["portfolios/CATEGORY"],
    })
  );

  const onClick = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      const thisValue = e.target.value;
      // type에 따른 클릭
      if (thisValue === "web" || thisValue === "singlePage") {
        let typeQuery = "";
        // 체크 되었을 때
        if (isChecked) {
          const type = [...typeCheckbox, `&${thisValue}=true`];
          setTypeCheckbox(type);
          typeQuery = type.join("");
        }
        // 체크 해제되었을 때
        else {
          const typeFilter = typeCheckbox.filter(
            (c) => c !== `&${thisValue}=true`
          );
          setTypeCheckbox(typeFilter);
          typeQuery = typeFilter.join("");
        }
        setTypeQueryState(typeQuery);
      }
      // skill에 따른 클릭
      else {
        let skillQuery = "";
        // 체크 되었을 때
        if (isChecked) {
          const addSkill = [...skillCheckbox, thisValue];
          const skill = [...new Set(addSkill)];
          setSkillCheckbox(skill);
          skillQuery = `&skill=${skill}`;
        }
        // 체크 해제되었을 때
        else {
          const skill = skillCheckbox.filter((c) => c !== thisValue);
          setSkillCheckbox(skill);
          console.log(skill);
          if (skill.length === 0) {
            skillQuery = "";
          } else {
            skillQuery = `&skill=${skill}`;
          }
        }
        setSkillQueryState(skillQuery);
      }
    },
    [typeCheckbox, skillCheckbox]
  );

  useEffect(() => {
    dispatch(category());
  }, []);

  useEffect(() => {
    const query = skillQueryState + typeQueryState;
    history.push(`/portfolios?${query.substring(1)}`);
  }, [history, skillQueryState, typeQueryState]);

  return (
    <Category
      categories={categories}
      error={error}
      loading={loading}
      onClick={onClick}
    />
  );
};

export default withRouter(CategoryContainer);
