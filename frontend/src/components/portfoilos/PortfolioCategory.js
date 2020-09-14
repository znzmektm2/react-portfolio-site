import React, { useState, useEffect } from "react";
import Category from "./../common/Category";

const PortfolioCategory = React.memo(
  ({
    categories,
    error,
    loading,
    clickSkillCheckbox,
    clickTypeCheckbox,
    skillCheckbox,
    typeCheckbox,
  }) => {
    const [skillArr, setSkillArr] = useState();
    const [typeArr, setTypeArr] = useState();

    // URL query에 따라 스킬 체크박스 유지하는 함수
    const skillInputCheckedByUrl = (value) => {
      return skillArr && skillArr[value];
    };

    // URL query에 따라 타입 체크박스 유지하는 함수
    const typeInputCheckedByUrl = (value) => {
      return typeArr && typeArr[value];
    };

    useEffect(() => {
      // 스킬 체크박스 체크여부 배열 만들기
      let skillCheckedArr = [];

      if (categories) {
        for (let i = 0; i < categories.length; i++) {
          skillCheckedArr[categories[i]] = false;
        }
      }

      if (!!skillCheckbox) {
        for (let i = 0; i < skillCheckbox.length; i++) {
          skillCheckedArr[skillCheckbox[i]] = true;
        }
      }

      setSkillArr(skillCheckedArr);

      // 타입 체크박스 체크여부 배열 만들기
      let typeCheckedArr = [];

      typeCheckedArr["web"] = false;
      typeCheckedArr["singlePage"] = false;

      if (!!typeCheckbox) {
        for (let i = 0; i < typeCheckbox.length; i++) {
          typeCheckedArr[typeCheckbox[i]] = true;
        }
      }

      setTypeArr(typeCheckedArr);
    }, [categories, skillCheckbox, typeCheckbox]);

    if (error) {
      return <div>에러가 발생했습니다.</div>;
    }

    if (!categories) {
      // 로딩중이면서 카테고리가 없을 시
      if (loading) {
        return null;
      }
      // 로딩중이 아니면서 카테고리가 없을 시
      if (!loading) {
        return (
          <Category portfolioCategory>
            <div className="wrap">
              <ul>
                <li>데이터가 없습니다.</li>
              </ul>
            </div>
          </Category>
        );
      }
    }

    return (
      <>
        <Category portfolioCategory>
          <div className="wrap">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <input
                    type="checkbox"
                    name={category}
                    value={category}
                    defaultChecked={skillInputCheckedByUrl(category)}
                    onClick={clickSkillCheckbox}
                    className="skillInput"
                  />
                  <label htmlFor={category}>{category}</label>
                </li>
              ))}
            </ul>
          </div>
        </Category>
        <Category portfolioCategory>
          <div className="wrap">
            <ul>
              <li key="web">
                <input
                  type="checkbox"
                  name="web"
                  value="web"
                  defaultChecked={typeInputCheckedByUrl("web")}
                  onClick={clickTypeCheckbox}
                  className="typeInput"
                />
                <label htmlFor="web">Web</label>
              </li>
              <li key="singlepage">
                <input
                  type="checkbox"
                  name="singlePage"
                  value="singlePage"
                  defaultChecked={typeInputCheckedByUrl("singlePage")}
                  onClick={clickTypeCheckbox}
                  className="typeInput"
                />
                <label htmlFor="singlePage">SinglePage</label>
              </li>
            </ul>
          </div>
        </Category>
      </>
    );
  }
);

export default PortfolioCategory;
