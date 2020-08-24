import React from "react";
import Category from "./../common/Category";
import Responsive from "./../common/Responsive";

const PortfolioCategory = ({
  categories,
  error,
  loading,
  clickSkillCheckbox,
  clickTypeCheckbox,
}) => {
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
          <Responsive>
            <ul>
              <li>데이터가 없습니다.</li>
            </ul>
          </Responsive>
        </Category>
      );
    }
  }

  return (
    <>
      <Category portfolioCategory>
        <Responsive>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <input
                  type="checkbox"
                  name={category}
                  value={`${category}`}
                  onClick={clickSkillCheckbox}
                  className="skillInput"
                />
                <label htmlFor={category}>{category}</label>
              </li>
            ))}
          </ul>
        </Responsive>
      </Category>
      <Category portfolioCategory>
        <Responsive>
          <ul>
            <li key="web">
              <input
                type="checkbox"
                name="web"
                value="web"
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
                onClick={clickTypeCheckbox}
                className="typeInput"
              />
              <label htmlFor="singlePage">SinglePage</label>
            </li>
          </ul>
        </Responsive>
      </Category>
    </>
  );
};

export default PortfolioCategory;
